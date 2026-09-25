pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = (window.ASSET_PREFIX || "") + 'logo.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        if (!splash) return;
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #100609;',
            '}',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #100609;',
            '    z-index: 99999;',
            '}',
            '#application-splash {',
            '    position: absolute;',
            '    top: 50%;',
            '    left: 50%;',
            '    transform: translate(-50%, -50%);',
            '    width: 260px;',
            '}',
            '#application-splash img {',
            '    width: 100%;',
            '    border-radius: 8px;',
            '}',
            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 4px;',
            '    width: 100%;',
            '    background-color: #1a0b0e;',
            '    border-radius: 4px;',
            '    overflow: hidden;',
            '    box-shadow: inset 0 1px 3px rgba(0,0,0,0.5);',
            '}',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #00ccff;',
            '    box-shadow: 0 0 10px #00ccff, 0 0 20px #00ccff;',
            '    border-radius: 4px;',
            '    transition: width 0.3s ease-out;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 180px;',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
