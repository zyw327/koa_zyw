module.exports = {
    "extends": "google",
    "plugins": [
        "promise"
    ],
    "parserOptions": {
        "ecmaVersion": 7
    },
    "rules":{
        "max-len": [1, 300],
        "new-cap": [2, {"newIsCap":true,"capIsNew":false}],
        "comma-dangle": [0,"always-multiline"],
        'generator-star-spacing': 1
    },
    "parser": "babel-eslint"
};