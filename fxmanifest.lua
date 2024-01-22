fx_version 'cerulean'
game {'gta5', 'rdr3'}

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

lua54 'yes'

author 'TK Studios'
description 'TK Studios - Core Library. [ Version 1.0.0 ]'
url 'https://tkstudios.store'
version '1.0.0'

escrow_ignore {
    "node_modules/**/*",
    "server/config/index.js",
    "install/**/*",
}

dependencies {
    "PolyZone",
    "yarn",
}

server_scripts {
    'server/index.js',
}

exports {
    'logger',
    'notify',
    'dbManager',
}