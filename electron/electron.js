process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`);

// electron
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
let template;
let menu;

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {

    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({
        width: 1224,
        height: 1000,
        backgroundColor: '#000',
        title: 'Kirchenchronik St-Veit',
        webPreferences: {
            plugins: true
        },
        icon: 'file://' + __dirname + '/favicon.ico'
    });
    mainWindow.setAutoHideMenuBar(true);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Tell Electron where to load the entry point from
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const template = [{
        label: '&Datei',
        submenu: [{
            label: '&Beenden',
            accelerator: 'Ctrl+W',
            click: () => {
                mainWindow.close();
            }
        }]
    }, {
        label: '&Ansicht',
        submenu: [{
            label: '&Neu laden',
            accelerator: 'Ctrl+R',
            click: () => {
                mainWindow.reload();
            }
        }, {
            label: '&Vollbild',
            accelerator: 'F11',
            click: () => {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }, {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: () => {
                mainWindow.toggleDevTools();
            }
        }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
});
