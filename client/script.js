(async function(global, configKey) {
    console.log("Script initialized with configKey:", configKey);

    global[configKey] = global[configKey] || function(config) {
        console.log("customConfig called with:", config);
        (global[configKey].q = global[configKey].q || []).push(config);
        processQueue();
    };

    // Fetch popup data from the database
    async function fetchPopups(websiteId) {
        try {
            const response = await fetch(`http://localhost:5001/popups/get-popups/${websiteId}`);
            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error("Error fetching popup data:", error);
            return [];
        }
    }

    // Function to track visitors
    function trackVisitor(config) {
        console.log("Tracking visitor with config:", config);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://eo5yzla6isyvxnm.m.pipedream.net', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify({
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            siteId: config.siteId || 'unknown'
        }));
    }

    // Function to manipulate the DOM
    function manipulateDOM(config) {
        console.log("Manipulating DOM with config:", config);
        var shadowHost = document.createElement('div');
        shadowHost.id = 'custom-popup-host';
        shadowHost.style.position = 'fixed';

        switch (config.popupCorner) {
            case 'top-left':
                shadowHost.style.top = '20px';
                shadowHost.style.left = '20px';
                break;
            case 'top-right':
                shadowHost.style.top = '20px';
                shadowHost.style.right = '20px';
                break;
            case 'bottom-left':
                shadowHost.style.bottom = '20px';
                shadowHost.style.left = '20px';
                break;
            case 'bottom-right':
                shadowHost.style.bottom = '20px';
                shadowHost.style.right = '20px';
                break;
            default:
                shadowHost.style.bottom = '20px';
                shadowHost.style.right = '20px';
                break;
        }

        shadowHost.style.width = '300px';
        shadowHost.style.zIndex = '1000';
        document.body.appendChild(shadowHost);

        var shadow = shadowHost.attachShadow({ mode: 'open' });

        // Add styles
        var style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            .popup-content {
                background-color: ${config.popupColor};
                padding: 20px;
                box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                font-family: Arial, sans-serif;
                animation: slideUp 0.5s ease-out;
                position: relative;
                height: 60px;
            }

            .close-button {
                position: absolute;
                top: 5px;
                right: 5px;
                cursor: pointer;
                background: transparent;
                border: none;
                font-size: 16px;
            }
        `;
        shadow.appendChild(style);

        // Add popup content
        var popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        popupContent.textContent = config.popupText;

        var closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(shadowHost);
        });

        popupContent.appendChild(closeButton);
        shadow.appendChild(popupContent);
    }

    // Function to update popup preview (optional)
    function updatePopupPreview(config) {
        // This function is optional and not used in the current logic.
    }

    // Process the queue of configurations
    async function processQueue() {
        console.log("Processing config queue");
        var queue = global[configKey].q || [];
        for (var i = 0; i < queue.length; i++) {
            var config = queue[i];
            trackVisitor(config);
            const popups = await fetchPopups(config[0].siteId);
            if (Array.isArray(popups)) {
                popups.forEach(popup => {
                    manipulateDOM(Object.assign({}, config, {
                        popupText: popup.message,
                        popupColor: popup.color,
                        popupCorner: popup.corner
                    }));
                });
            } else {
                console.error("Expected popups to be an array but got:", typeof popups);
            }
            updatePopupPreview(config);
        }
        global[configKey].q = [];
    }

    processQueue();
})(window, 'customConfig');
