# Customizing

> **Beachte:** Bei umfangreicheren Abweichungen vom Theme ist ein Designer hinzuzuziehen.

Manchmal haben Projekte spezielle Anforderungen und benötigen ein angepasstes *webapp-theme-crick*.

## Angepasstes Theme aus den Sourcen bauen

Falls noch nicht geschehen:

```
npm install @datev/webapp-theme-crick
```

Um aus den `*.scss`-Sourcen (SASS) des Theme ein angepasstes Theme bauen zu können, benötigt die Anwendung eine eigene `custom.scss` als Einstiegspunkt für das eigene Stylesheet.

*Typische Projektstruktur in Angular-CLI-Projekten*
```
${PROJECT_ROOT}
     |- node_modules/
     |     |- @datev/webapp-theme-crick/assets/
     |           |- scss/
     |               |- dna-theme.scss
     |               |- dna-theme-components.scss
     |               |- _variables.scss
     |               |- ...
     |
     |- src/
         |- app/
         |    |- main.ts
         |- assets/
              |- scss/
                  |- custom-styles.scss
                  |- custom-variables.scss
                  |- custom.scss             <== Einstiegspunkt
```


   - Angular-CLI-Anwendungen referenzieren *custom.scss* z.B. in `angular.json` (vgl. [Anhang A](#anhang-a-konfiguration-eines-angular-cli-projekt)).
   - Anwendungen mit eigenem Webpack-Build müssen ihren Einstiegspunkt ggf. im Source-Code importieren, z.B. per `import "./path/to/my/custom.scss"` in `main.ts`, damit Webpack sie im Build berücksichtigt. Sie benötigen außerdem eine Webpack-Konfiguration mit entsprechenden Ressource-Loading-Regeln (vgl. [Anhang B](#anhang-b-webpack-konfiguration-mit-scss-und-svg-loader-regeln-und-sass-loader))



Das eigene *custom.scss* sollte nun mindestens folgenden Grundaufbau haben:

*custom.scss*
```scss
@import "~@datev/webapp-theme-crick/assets/scss/_variables.scss";
@import "custom-variables"; // <== vordefinierte Variablen modifizieren per ./custom-variables.scss

@import "~@datev/webapp-theme-crick/assets/scss/dna-theme-components.scss";
@import "custom-styles"; // <== vordefinierte Styles überschreiben per ./custom-styles.scss
```

*custom-variables.scss*

```scss
// Asset-Pfad setzen: dies ist zwingend nötig!
$dna-assets-path: "~@datev/webapp-theme-crick/assets";

// ...andere Variablen nach Bedarf überschreiben, z.B.
// $grid-columns: 18
```

> **Tipp:**
>
>Die Größe des gebauten CSS-Files lässt sich reduzieren, wenn - statt *dna-theme-components.scss* mit *allen* Komponenten-Styles - nur die Komponenten-Styles einzeln importiert werden, die in der eigenen Anwendung benötigt werden. Als Ausgangspunkt kann der Inhalt von *dna-theme-components.scss* kopiert und die nicht benötigten Imports auskommentiert werden. Die Import-Pfade müssen jeweils mit `~@datev/webapp-theme-crick/assets/scss` beginnen.
>
>Sollten die Imports nicht aufgelöst werden können, muss ggf. auch noch ein führender Unterstrich `_` im Dateinamen und die Endung `.scss` ergänzt werden.
>
> **Achtung:**  
> Wenn die dna-theme-components.scss nicht vollständig verwendet wird, muss die `.genepool`-Klasse selbstständig um die importierten Komponenten-Styles gesetzt werden.

## Anhang

### Anhang A: Konfiguration eines Angular-CLI-Projekt
<a name="#anhang-a-konfiguration-eines-angular-cli-projekt"></a>

*Relevante Abschnitte in `angular.json` (vgl. [Point-of-Sales (PoS)](https://git.zd.datev.de/webappcommunity/samples/pos) Demo-Anwendung)*
```js
{
    "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            // ...
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "./node_modules/@datev/webapp-theme-crick/assets/sprites",
                "output": "./assets/sprites"
              }
            ],
            "styles": [
              // Einstiegspunkt für Custom-Theme ausgehend von Projektverzeichnis
              "src/assets/scss/custom.scss"
            ]
            // ...
          },
          "configurations": {
            "production": {
              "extractCss": true,
              // ...
            }
          }
        },
        // ...
```

### Anhang B: Webpack-Konfiguration mit SCSS und SVG-Loader-Regeln und *sass-loader*
<a name="#anhang-b-webpack-konfiguration-mit-scss-und-svg-loader-regeln-und-sass-loader"></a>

*webpack.config.json mit [Sass-Loader](https://webpack.js.org/loaders/sass-loader/) und Berücksichtigung von SVGs bei den Image-Assets*

```js
{
    // ...
    module: {
        rules: [
            ,{  // Load CSS/SCSS-Files
                test: /\.(css|scss)$/,
                loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
            ,{  // Load image assets
                test: /\.(png|jpe?g|svg|ico|gif)$/,
                loader: "file-loader",
                options: {
                    name: "assets/images/[name].[hash].[ext]"
                }
            }
        ]
    }
}
```

### Anhang C: Warum müssen Customized-Themes *dna-theme-components.scss* und nicht *dna-theme.scss* importieren?
<a name="#anhang-c-warum-kein-dna-themescss-f%C3%BCr-custom-themes-importieren"></a>

*Der Bau mit folgender custom.scss funktioniert nicht:*
```scss
@import "~@datev/webapp-theme-crick/assets/scss/dna-theme.scss";
@import "custom-styles.scss";
```

SASS löst Pfade stets relativ zum Einstiegspunkt auf, d.h. relativ zu `custom.scss`. Die im DNA-Theme verwendeten Pfade sind aber relativ zur internen Ordnerstruktur im Paket *webapp-theme-crick*. Sie werden also bei Ausgangspunkt `custom.scss` nicht zum richtigen Ziel führen. Um das zu beheben, muss die Variable `$dna-assets-path` bei Customized Themes so überschrieben werden, dass sie auf die Assets des DNA-Themes im *node_modules*-Ordner zeigt. Da *dna-theme.scss* aber die eigenen Theme-Variablen fest einbindet, lässt sich die Variable nicht modifizieren. Für eigene Themes müssen daher

1. erst die `_variables.scss` des *webapp-theme-crick*
1. dann `$dna-assets-path` angepasst
1. dann `dna-theme-components.scss` aus *webapp-theme-crick*

importiert werden:

*Der Bau mit folgender custom.scss funktioniert*
```scss
@import "~@datev/webapp-theme-crick/assets/scss/_variables.scss";
$dna-assets-path: "~@datev/webapp-theme-crick/assets";
@import "~@datev/webapp-theme-crick/assets/scss/dna-theme-components.scss";
// ...
```

### Anhang D: Known Issues & Solutions

#### Issue: Jenkins-Builds schlagen bei der Installation von node-sass fehl

- **Fehlerbild:** Die Binary-Prüfung von *node-sass* schlägt fehl mit "invalid ELF header". Der von *node* gestartete Versuch das Binary dann lokal zu bauen (`gyp`) aufgrund der dafür nicht vorbereiteten Jenkins-Umgebung ebenfalls (vgl. Log unten).

- **Lösung:** Probiere im Jenkinsfile statt z.B. `tool "nodejs-v8"` die neueste Version von Node `tool "nodejs"` zu verwenden (zumindest für die Installation der Abhängigkeiten mit `npm install`).

*Jenkinsfile (Diff)*
```
-   def nodejs = tool 'nodejs-v8'
+   def nodejs = tool 'nodejs'
    withEnv(["PATH+NODEJS=${nodejs}/bin"]) {
        ...
    }
```

*Fehlermeldung (Auszug)*
```
+ npm install
> node-sass@4.9.4 install /data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-sass
> node scripts/install.js
Cached binary found at /home/buildo2/.npm/node-sass/4.9.4/linux-x64-57_binding.node
> node-sass@4.9.4 postinstall /data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-sass
> node scripts/build.js
Binary found at /data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-sass/vendor/linux-x64-57/binding.node
Testing binary
Binary has a problem: Error: /data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-sass/vendor/linux-x64-57/binding.node: invalid ELF header
    at Object.Module._extensions..node (module.js:682:18)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Module.require (module.js:597:17)
    at require (internal/module.js:11:18)
    at module.exports (/data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-sass/lib/binding.js:19:10)
    at Object.<anonymous> (/data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-sass/lib/index.js:14:35)
    at Module._compile (module.js:653:30)
    at Object.Module._extensions..js (module.js:664:10)
Building the binary locally
[]..]
gyp ERR! configure error
gyp ERR! stack Error: This is most likely not a problem with node-gyp or the package itself and
gyp ERR! stack is related to network connectivity. In most cases you are behind a proxy or have bad
gyp ERR! stack network settings.
gyp ERR! stack     at Request.<anonymous> (/data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-gyp/lib/install.js:197:21)
gyp ERR! stack     at emitOne (events.js:116:13)
gyp ERR! stack     at Request.emit (events.js:211:7)
gyp ERR! stack     at Request.onRequestError (/data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-gyp/node_modules/request/request.js:881:8)
gyp ERR! stack     at emitOne (events.js:116:13)
gyp ERR! stack     at ClientRequest.emit (events.js:211:7)
gyp ERR! stack     at TLSSocket.socketErrorListener (_http_client.js:401:9)
gyp ERR! stack     at emitOne (events.js:116:13)
gyp ERR! stack     at TLSSocket.emit (events.js:211:7)
gyp ERR! stack     at emitErrorNT (internal/streams/destroy.js:66:8)
gyp ERR! System Linux 3.10.0-957.5.1.el7.x86_64
gyp ERR! command "/data/jenkins.bk.datev.de/jenkins/tools/nodejs/node-v8.14.0-linux-x64/bin/node" "/data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-gyp/bin/node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags=" "--libsass_library="
gyp ERR! cwd /data/jenkins.bk.datev.de/buildo2/workspace/sass-fehl-mit-invalid-elf-header/node_modules/node-sass
gyp ERR! node -v v8.14.0
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok
Build failed with error code: 1
```
