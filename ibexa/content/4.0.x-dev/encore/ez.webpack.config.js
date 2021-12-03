const path = require('path');
const bundles = require('./var/encore/ez.config.js');
const eZConfigManager = require('./ez.webpack.config.manager.js');
const configManagers = require('./var/encore/ez.config.manager.js');

module.exports = (Encore) => {
    Encore.setOutputPath('public/assets/ezplatform/build')
        .setPublicPath('/assets/ezplatform/build')
        .addExternals({
            react: 'React',
            'react-dom': 'ReactDOM',
            moment: 'moment',
            'popper.js': 'Popper',
            alloyeditor: 'AlloyEditor',
            'prop-types': 'PropTypes',
        })
        .enableSassLoader()
        .enableReactPreset()
        .enableSingleRuntimeChunk();

    bundles.forEach((configPath) => {
        const addEntries = require(configPath);

        addEntries(Encore);
    });

    const eZConfig = Encore.getWebpackConfig();

    eZConfig.name = 'ibexa';

    configManagers.forEach((configManagerPath) => {
        const configManager = require(configManagerPath);

        configManager(eZConfig, eZConfigManager);
    });

    return eZConfig;
};
