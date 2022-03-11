<!--
# xx.xx.2018 (vx.x.x) NEXT
### Features
### Updates
### Breaking Changes
-->
# 08.03.2022 (v4.0.0)
Mit diesem Release wird die Kompatibilität von *webapp-theme-crick* mit *DACKL* sichergestellt. Die Updates und Breaking Changes sind unten bei den *beta* und *alpha* Releases aufgelistet.
Im [Wiki](https://git.zd.datev.de/webappcommunity/frontend/webapp-theme-crick/-/wikis/home) gibt es außerdem eine Migrationsanleitung.

# 28.01.2022 (v4.0.0-beta.1)
### Updates
* Nacharbeiten aus der Alpha-Phase:
  * Die Base-Font-Size wurde wieder wie bisher relativ auf 0.625em gesetzt
    * im `dna-theme.css` auf dem `html`-Tag
    * im `dna-theme-isolated.css` auf der `genepool`-Klasse
  * Das `dna-theme-grid18-isolated.css` wird jetzt auch mit den isolierten Klassen ausgeliefert.

### Migrationsanleitung
Die Anleitung zur Migration auf v4 findest du im Wiki unter https://git.zd.datev.de/webappcommunity/frontend/webapp-theme-crick/-/wikis/v4/Migration-Guide

# 14.12.2021 (v4.0.0-alpha.1)

### Breaking Changes
* Der Umbau für die Kompatibilität mit DACKL (siehe Updates) hat folgende Auswirkungen auf `dna-theme.css` und `dna-theme-grid18.css`:
  * Die SVGs (`.svg-fi...`) sind nun nur noch innerhalb von `.genepool` verfügbar.
  * Die Base-Font-Size wurde im `html` fest auf `10px` geschrieben.
* Wenn von Verwenderprojekten direkt auf die SASS-Dateien von *webapp-theme-crick* zugegriffen wird, muss davor eine Methode importiert werden, die die Umrechunng der `rem`-Werte vornimmt.
  Dazu stehen die beiden Dateien `_calc-rem-crick.scss` (für das "klassische" Crick-Theme mit 10px Base-Font-Size) und `_calc-rem-isolated.scss` (für das "isolierte" Crick-Theme mit 16px Base-Font-Size) zur Verfügung und können aus den `node_modules` eingebunden werden:
  ```scss
  // entweder
  @import "~@datev/webapp-theme-crick/assets/scss/calc-rem-crick";
  // oder
  @import "~@datev/webapp-theme-crick/assets/scss/calc-rem-isolated";
  ```

### Updates
* Neben den bisherigen Stylesheets (`dna-theme.css` und `dna-theme-grid18.css`) werden zwei neue Stylesheets (Suffix `-isolated`) angeboten. Diese
  * basieren auf eine Base-Font-Size von `16px` (nicht mehr 10px)
  * sind konsequenter nach außen hin gekapselt (funktionieren nicht mehr außerhalb von `.genepool`)
* Dadurch wird die gleichzeitige Verwendung von *webapp-theme-crick* und *DACKL* ermöglicht.

# 28.07.2021 (v3.2.0)
### Updates
* durch `gulp-sass` genutzten Compiler von `node-sass` (deprecated) auf `sass` geändert

# 29.10.2020 (v3.1.1)
### Bugfix
* TriState-Checkbox unterstützt nun ein mehrzeiliges Label

# 22.10.2020 (v3.1.0)
### Updates
* Styling für eine TriState-Checkbox-Komponente, die in den [ngx-ui-components](https://git.zd.datev.de/webappcommunity/frontend/ngx-ui-components/-/issues/95) veröffentlicht wird. (#124)

# 12.10.2020 (v3.0.5)
### Bugfix
* Behebung des Problems, dass das letzte Breadcrumb-Item frühzeitig abgeschnitten wird. (#123)

# 09.01.2020 (v3.0.4)
### Bugfix
* Fehlerhafte Toast-Notification-Platzierung gefixt (#116)

# 29.11.2018 (v3.0.3)
### Bugfix
* Bild-Label der DATEV Gallery in der Breite beschränkt (#115)

# 16.09.2019 (v3.0.2)
### Bugfix
* Z-Index des Loaders angepasst (#114)

# 05.09.2019 (v3.0.1)
### Bugfix
* Beim Dropdown Button Light wurde das zweite, fehlerhaft dargestellte Icon entfernt (#113)

# 21.08.2019 (v3.0.0)

Mit diesem Release verwendet *webapp-theme-crick* ab sofort **Bootstrap 4**. Mehr Details dazu finden sich im [Migration Guide](./MIGRATION.md) und in diesem Changelog bei den *beta* und *alpha* Releases.

> Die Wartung von *webapp-theme-crick v2* auf Basis von Bootstrap 3 erfolgt ab sofort auf dem Maintenance-Branch `v2-maintenance`. Es wird keine neuen Major-Releases vom Theme auf Basis von Bootstrap 3 mehr geben.

### Breaking Changes
* keine (ggü. *v3.x-beta* und *v3.x-alpha* Releases)

### Bugfixes
* Darstellungsproblem bei list-groups behoben: cards als list-group-item haben jetzt wieder die richtige border (#112)

### Updates
* Card-Deck-Layout erweitert (#111)

# 18.06.2019 (v3.0.0-beta.1)

### Breaking Changes
* `.btn-link` ist jetzt nicht mehr ein block-Element, sondern  inline-block (#100)
* `.dna-btn-grid` entfernt, kann durch bootstrap-Klassen erreicht werden (z.B. `.d-block` oder `.w-100`)
* `.btn-help` umbenannt zu `.dna-btn-help`
* `.form-label` umbenannt zu `.col-form-label` für horizontale Formulare entsprechend Bootstrap, Redundanzen entfernt, Margins/Paddings angepasst (löst #83)
* `.form-control` hat nur noch in horizontalen Formularen automatisch einen Abstand noch unten --> ansonsten `.form-group` verwenden
* `.form-group` hat einen größeren Abstand nach unten - optimiert für vertikale Formulare
* die Klassen `.checkbox` und  `.radio` wurden ersetzt durch `.form-check`. Die beiden Klassen `.form-check-input` (input) und `.form-check-label` kommen hinzu (#73). Zur genauen Verwendung siehe Migration-Guide oder DATEV-MAP-3.
* die `.genepool`-Klasse wurde in Vorbereitung auf dessen Entfernung aus allen Einzeldateien entfernt und an eine zentralere Stelle in die `dna-theme-components.scss` verschoben (#72).
* Definition für `html` und `body` in *_dna-html.scss* verschoben (#109)

### Updates
* Ausbau Migration-Guide (Formulare)
* Anpassung der Abstände in der datev-gallery (#107)

# 12.02.2019 (v3.0.0-alpha.2)

### Breaking Changes

* Grid Layout: Standard-Spaltenanzahl ist nun 12 statt 18 (#59, #62);
  für 18-Spaltige Layouts kann aber ein extra CSS (dna-theme-grid18.css) eingesetzt werden
  oder der Code mittels Variablen im Projekt angepasst werden. Siehe auch [./doc/grid.md](./doc/grid.md)

* Variablen aus alpha.1

    - `$dna-svg-path`
    - `$dna-image-path`
    - `$dna-sprite-path`

    ersetzt mit

    - `dna-assets-path`

    Die neue Variable hält einen Pfad auf den */assets*-Ordner im Theme.

* LESS-Files, Build-Configs und Package-Dependencies entfernt (#77). Entfernte */src*-Ordner

    - *src/assets/css*
    - *src/assets/less*
    - *src/assets/fonts*

  Das ausgelieferte Package wird weiterhin den Ordner */assets/css* mit dem gebauten *dna-theme.css* haben.

### Features

* Anbindung Autoprefixer


# 01.02.2019 (v3.0.0-alpha.1)
Aktualisierung der Paketversionen auf v3.0.0

### Breaking Changes

Umstellung von Bootstrap3 auf Bootstrap 4 (#45). Technische Änderungen und Migration

- siehe https://getbootstrap.com/docs/4.1/migration/
- Migrationguide [./MIGRATION.md](./MIGRATION.md) in diesem Projekt

Gestalterische-Änderungen vor allem in den Bereichen
  * Typografie (#46)
    * Grundschriftgröße auf 1.4rem vergrößert
    * Größe der Überschriften entsprechend angepasst
  * Anpassung der Breakpoints, inkl. neuem Breakpoint XL
  * Grid: das Grid in diesem Release enthält noch 18-Spalten. Dies wird sich mit Alpha.2 ändern.

<!--
### Features

### Updates
-->

### Bugfixes
  * Disabled-Style jetzt auch für SVG-Icons verfügbar (#79)

<!--
# NEXT (v.2.0.1)
Aktualisierung der Paketversionen auf 2.0.1

### Bugfixes
  * Styles für Icons in **disabled** Elementen funktionieren jetzt auch bei SVGs (#79)
-->

# 10.12.2018 (v.2.0.0)

Mit diesem Major-Release können wir einige Neuerungen präsentieren. Die größte Änderung ist die **Einführung
von SVG-Icons**, welche einige Strukturanpassungen und damit *breaking changes* nach sich zieht.
Außerdem haben wir das GUI an einigen Stellen aktualisiert. Im Zuge des gab es kleinere Aufräumarbeiten.

Passend zu diesem Release wurden auch die [ngx-ui-components](https://git.zd.datev.de/webappcommunity/frontend/ngx-ui-components) auf v2.0.0 aktualisiert.

Die unterliegende Basis ist weiterhin Bootstrap 3.

## Changes
*  Aktualisierung der Paketversionen auf 2.0.0

### Breaking Changes
* GUI Facelift (#32)
  * Anpassung der Konstruktion (Line-height, padding)
  * neue Animationen, neue Farben
  * betreffen u.a. Button(-Varianten), Input, Checkbox, RadioButton
  * Button Medium + Large: Anpassung der Größen (#32)
* Umstellung auf SVG-Icons im html-template (#43)
  * SVG-Sprite mit SVG-Icons für zentrale Komponenenten/Controls/UI - incl. tooling und config für automatisierte Erstellung
  * Buttons: Geometrie (padding) innerhalb der Buttons angepasst, sodass die größeren SVG-Icons richtig positioniert werden; Image-Buttons (btn-img) mit Flexbox Layout
  * PNG-Icons im CSS gegen SVG im template getauscht -> Änderungen in ngx-ui-components
    * DropdownButton
    * Notifcations: Anpassung Schließen-Button
    * Tagging-Control
    * Sidebar
  * PNG-Icons, die nicht mehr verwendet werden, aus Sprite entfernt
* Depracted Style `.dna-jumplist` entfernt (Ersatz ist `class="list-group dna-list-group-links dna-list-group-condensed"`)
* Variablen geändert
  * Ungenutze/Veraltete Farb-Variablen entfernt: `@dna-weiss-B`, `@dna-pastellgruen`, `@dna-pastellgruen-A`, `@dna-hellgruen-B`
  * Farbvariablen für Button-Hintergrund mit präfix "dna-" benannt

### Features
* Neue Farb-Variable `@dna-border-lighter` eingeführt

### Updates
* GUI Facelift (#32)
  * Popover: Facelift der Styles
  * Panel: hellere Borderfarbe
* Alte (png-)Icons in bg-images mit neuen SVG-Icons ersetzt (#43) - keine Änderung am template
  * Link-Button
  * Interactive Lists
  * Breadcrumb
  * Message-Provider
  * Select-Light
  * Datepicker
  * Notification: Alerts
  * Collapsible
  * Hilfe-Button
  * Checkbox
  * Radiobutton
* Tagging: Placeholder-Textfarbe vereinheitlicht
* Schriften: Fallbackdefinition für  *Segoe UI* (Sans-Serif-Schrift) erweitert (#5)

### Bugfix
* 'button'-Text bei eingeschalteten Barrierefreiheits-Einstellungen nun nicht mehr sichtbar (#33)
* Dropdown-Menü z-index wurde angepasst, um den Hintergrund-Fehler in der Dropdown-Liste zu beseitigen.


# 16.09.2018 (v1.1.0)
  * **Features:**
    * fonts.css (v1.1.0) von Asset-Server integriert. Somit müssen die webfonts  nicht mehr im Projekt selbst angezogen werden. (#9)
  * **Updates:**
    * Styleanpassungen Breadcrumb: das letzte Element ist nicht aktiv (#35)
    * Popover: Styling für popover, die unter Formularelementen nach unten öffnen
  * **Bugfix**
    * Der Text einer Checkbox wird nun korrekt umgebrochen (#39)


# 13.06.2018 (v1.0.0): Theme als eigenes Paket
  * **Neuer Paketname** `webapp-theme-crick`
  * **Breaking Change**
    * `@datev/webapp-theme-crick`: Required-Style vom Attribut [required] entkoppelt, die visuelle Pflichtfeldkennzeichnung wirkt nur noch über die Klasse "required" (#86). Siehe auch https://datev-map.pcfapps.dev.datev.de/conceptual-patterns/index.html#required
  * **Features**
    * `@datev/webapp-theme-crick`: "optional"-Styling für Labels hinzugefügt, als Alternative zum Pflichtfeldstyle
  * **Bugfix**
    * `@datev/webapp-theme-crick`:
      * Fehlender Variablenwert `@list-group-hover-bg` eingetragen (#327)
      * Default-Line-height so vergrößert, dass Buchstaben auch im IE nicht mehr abgeschnitten werden (#291)
      * Darstellungsprobleme bei Buchstaben mit Unterlänge (q,p,g,..) durch Anpassung von Padding bei Label und Select-Elementen korrigiert (#348)
    * `webapp-theme`:
      * font-weight 550 bei @dna-headings-small-font-weight korrigiert --> font-weight 600 (#25)

# 29.03.2018 (v4.0.1)
**Bugfix**
  * Abwärtskompatibilität ng4 (#336)

# 28.03.2018 (v4.0.0)
  * **Breaking Changes**
    * JavaScript-Artefakte werden als **ES5 mit ES2015 Modulsyntax** ausgeliefert. Auf diese Weise wird effizienteres *Tree-Shaking* und kleinere Bundles ermöglicht. Dies ist potentiell ein Breaking Change. Anwendungen die mit **Webpack** bauen, sollten weiterhin in älteren Browsern lauffähig sein, da Webpack die Modulsyntax beim Bundling ersetzt und alles andere ES5-Syntax ist. Bitte die Aussage durch Tests mit älteren Browsern für die eigene Anwendung prüfen.
  * **Bugfix:**
    * Compile-Fehler beim Einbinden der Datev Ria Components in Angular 5 Anwendung mit Cli 1.6.0 (#309). **[Workarounds](#309) mit vollqualifizierten Import-Pfaden sollten zurück gebaut werden.**
  * **Features**
   * `@datev/angular` Sidebar kann nun beim Startup geöffnet oder geschlossen angezeigt werden (#315)
   * `@datev/angular` Navigation über Breadcrumb-Links behält nun die angegeben Query-Parameter (#335)

# 12.03.2018 (v3.3.0)
  * **Features:**
    * `@datev/bootstrap3`:
      * Definition neuer Fonts (Noto) (#296)
      * Herauslösen der Fonts auf einen Asset-Server, den jede Anwendung einbinden muss: siehe https://git.zd.datev.de/webappcommunity/applications/assets/tree/master/public/datev/fonts

  * **Enhancement:**
    * `@datev/bootstrap3`:
      * Clean up Tagging-Control-Styles (#273)
      * Gallery-Darstellung auf mobilen Geräten verbessert (#313)

    * Ausführung der UnitTests lokal im ChromeHeadless und auf dem Jenkins im PhantomJS (#325)

# 19.12.2017 (v3.2.1)
  * **Bugfix:**
    * `@datev/angular`
      * `@datev/core-format` als dependency hinzugefügt (#310)

# 13.12.2017 (v3.2.0)
  * **Feature:**
    * `@datev/core-format`
       *  Neues Paket für Ein-/Ausgabeformatierer von häufig verwendeten Datenwerten (IBANs, Datumswerte, Zahlen)

  * **Enhancement**:
      * `@datev/dropdownbutton`:
         *  Anpassung für Accessibility" (#192)
         *  Umbau auf inline-block-Mode (#288)
      * `@datev/datev-loader`:
         *  ungenutzte Varianten entfernt, Templates und Layouts angepasst: Größe SMALL ist jetzt inline verfügbar (#294)
         *  z-index gesetzt, sodass der Loader immer in der obersten Ebene sitzt (#285)
      * `@datev/bootstrap3`:
         * Styles für datepicker erweitert (#286)
  * **Build:**
    * Generalisierter Bau einzelner Pakete, aufrufbar per Kommandozeilenargument, z.B. `npm run build -- --logging` oder `gulp build --logging`
    * Vereinfachtes Gulpfile und vereinfachte Integration neuer Packages
    * VSCode Launch Configuration für Debugging des Builds
  * **Bugfix**:
      * `@datev/bootstrap3`:
         *  Fix: Anwendung reagiert jetzt in allen Browsern auf Schriftgrößenänderungen (#289)
      * `@datev/datev-gallery`:
         *  Es wurde kein Property-Binding für src des Images verwendet. (#192)
      * `@datev/pdf-viewer`:
         *  Property 'onResize' is private and only accessible within class 'DatevPdfViewerComponent' bei AOT-Build. (#293)

# 14.11.2017 (v3.1.7)
  * **Bugfix**:
      * `@datev/notification`:
         *  Fix "Zeilenumbruch in Alerts" (#284). Reverts #274.

# 13.11.2017 (v3.1.6)
  * **Features:**
    * Refactoring des Responsive Design der Breadcrumb
  * **Updates:**
    * `@datev/bootstrap3`:
      * Variable @dna-input-shadow entfernt, weil ungenutzt
      * Update Datepicker-Style für neue ngx-bootstrap-Komponente (#250)
      * Print-Optimierung: Media-Querys in dna-scaffolding und dna-header spezifieren auf "screen" (#278)
      * modal-content-bg auf @dna-hellgrau geaendert (#277)

  * **Bugfix**:
    * `@datev/tagging`:
       *  Fix "Sehr langes Wort als Tag ausgewählt besitzt keinen Abstand zum Rand der Tag-Combobox" (#275)
    * `@datev/notification`:
       *  Fix "Langes Wort ohne Leerzeichen wird nicht unterbrochen" (#274)
    * `@datev/logging`:
       * Logging (Docs): Verwendungsbeispiel nicht mit AoT kompatibel (#282)

# 02.10.2017 (v3.1.5)
  * **Enhancement**:
    * `@datev/angular`:
       * Removes style classes: The control of the scrollbars during page adjustment to the viewport is a component local task and must not be overwritten by external style classes.
       * Removes class binding: Direct DOM manipulation of HTML attributes are faster than binding to a component `property`. An appearing or disappearing scrollbar controlled by the `style`-attribute (`overflow`) ___must have an immediate effect on the client rect___, otherwise the final viewport dimensions are calculated incorrectly.

# 26.09.2017 (v3.1.4)
  * **Enhancement**:
    * `@datev/angular`:
       * The `datev-pdf-viewer.component.ts` has `pdfjs-dist` in its dependency tree. Therefore the packages main file (`index.js`) must not export the viewer. Otherwise every datev-ria user has to install the pdfjs-dist module even if it is not needed. To resolve this problem and to avoid the `src` segment in `import`-statements, an indirection file `pdf-viewer.ts` has been added to the root folder
    * `@datev/bootstrap3`:
      * Optimizes viewer progress bar style

# 26.09.2017 (v3.1.3)
  * **Bugfix**:
    * `@datev/angular`:
       *  Fehlerbehafteter Export von @datev/pdf-viewer vorläufig entfernt

# 26.09.2017 (v3.1.2)
  * **Bugfix**:
    * `@datev/pdf-viewer`:
       *  Bereitstellung einer neuen PDF Viewer Komponente (#259).

# 25.09.2017 (v3.1.1)
  * **Bugfix**:
    * `@datev/tagging`:
       *  Fix "Beim Filtern werden die gefilterten Tags mit HTML-Formatierung gezeigt" (#260)
       *  Fix "Alle Einträge mit gleichen Namen werden aus der List entfernt, wenn einer der Tags selektiert wird" (#260)

# 07.09.2017 (v3.1.0)
  * **Bugfix**:
    * `@datev/logging`:
       * "Module not found: Error: Can't resolve './src/LogAppender' in 'node_modules/@datev/logging'" (#248)
  * **Enhancement**:
    * `@datev/angular`:
       * datev-tagging: Änderung des binding properties innerHTML auf innerText aus security Gründen (#247).
       * datev-notification: HTML Hinweismeldungen können über einen zusätzlichen optionalen Parameter (trustMessageAsHtml) beim Verwenden der notification service Methoden erzeugt werden; in diesem Fall trägt der Verwender der Komponente die Verantwortung für die Einhaltung der Sicherheitsrichtlinien (#247).

# 31.08.2017 (v3.0.1)
  * **Bugfix**:
    * `@datev/bootstrap`:
       * Fake-CDN-URL für DATEV-Font von http auf https umgestellt, zur Vermeidung von Mixed-Content Fehlern im Browser (#244)

# 29.08.2017 (v3.0.0)
  * **Breaking Changes:**
    * `@datev/angular`
      * Entfernung des `DatevDatepickerModule` aufgrund der Abhängigkeit zu jQuery (#243)
      * Entfernung des `DatevAngularModule`, da Gesamtimport aller Ng-Module nicht mehr empfohlen wird (#235)
    * `@datev/bootstrap`
      * Vollständige Eliminierung von jQuery (#243)
  * **Enhancement**:
    * `@datev/bootstrap`:
       * Checkbox/Radiobutton: Erweiterung der Klassengesteuerten Zustände (required, disabled, ...) und deren Kombinationen (#234)

# 21.08.2017 (v2.2.7)
  * **Bugfix:**
    * `@datev/angular`:
       * datev-tagging: error TS2322: Type 'Set<{}>' is not assignable to type 'Set<string>' (#227)
       * datev-breadcrumb: Root-Segment wird wieder dargestellt (#228)
    * `@datev/bootstrap`:
       * checkbox/radiobutton: Fix der disabled-Styles (als Klassen) (#222)

# 02.08.2017 (v2.2.6)
  * **Bugfix:**
    * `@datev/angular`:
      * Fix Compile-Problem mit DatePicker und jQuery
      * Breadcrumb: Fehlerhaftes Auflösen einer Route, deren path "/" enthält (#191)
      * Docs: README zu ErrorHandlerImpl zeigt LogService-Konfiguration mit alter API (#207)
    * `@datev/bootstrap`:
      * Fix für Referenzierung der LESS-Variable @dna-wrapper-border-width
      * Headings werden nicht mehr abgeschnitten durch eine Vergrößerung der line-height (Achtung: Leichte Layoutverschiebungen sind möglich!) (#210)
      * Breadcrumb overflow-Verhalten im IE verbessert (#209)
      * Select: Text wird nicht mehr abgeschnitten; Ausrichtung im IE verbessert (#208)
      * Header: in XS Abstand der Schattenkante korrigiert (#220)
      * Header: in XS seitlicher Abstand korrigiert (#221)
    * `@datev/logging`:
      * AoT Warning LogErrorHandlerImpl (#223)
  * **Enhancement**:
    * `@datev/angular`:
      * Breadcrumb: `hideInBreadcrumb: true` als Standard (#218)
    * `@datev/logging`:
      * Logging: Doc-Struktur stärker an Schrittfolge bei Verwendung orientieren (#226)

# 20.07.2017 (v2.2.5-wjq)
  * Release ohne jQuery für Belegrundlauf (vgl. #204)

# 21.06.2017 (v2.2.4)
  * Aktualisierung der Paketversionen auf 2.2.4
  * **Updates:**
    * `@datev/logging`:
      * ConsoleAppender soll nicht `undefined` ausgeben, wenn kein Log-Datenobjekt mitgegeben wird (#155)
    * `@datev/datev-tagging`:
      * Refactoring und einen zusätzlichen Button hinzufügt


# 13.06.2017 (v2.2.3)
  * Aktualisierung der Paketversionen auf 2.2.3
  * **Update:**
    * `@datev/angular`:
      * datev-tagging Komponente wurde überarbeitet und Probleme im Umgang mit ansynchronen Daten wurden behoben.
      * ngModal wurde von Object in einen einfaches String Array überführt.

    * `@datev/bootstrap`:
      * Header responsive Verhalten -  Style Fine-Tuning
      * Breadcrumb: Overflow der Items integriert

# 31.05.2017 (v2.2.2)
  * Aktualisierung der Paketversionen auf 2.2.2
  * **Bugfix:**
    * `@datev/angular`:
      * datev-tagging Komponente kann mit asynchronen Daten umgehen

# 30.05.2017 (v2.2.1)
  * Aktualisierung der Paketversionen auf 2.2.1
  * **Features:**
    * `@datev/bootstrap`:
      * Neue Margin-Klassen und -Variablen (alte sind *deprecated* aber noch enthalten)
      * "Required" von inputs als Klasse angelegt
  * **Updates:**
    * `@datev/angular`:
      * Entfernung aller `moduleId`-Deklarationen
    * `@datev/bootstrap`:
      * Notification Alert: Positionierung und Größe gefixt
      * Notification Toast: Positionierung gefixt
      * Inputs in required und readonly erhalten jetzt den readonly-style

# 18.05.2017 (v2.2.0)
  * Aktualisierung der Paketversionen auf 2.2.0
  * **BREAKING CHANGE:**
    * `@datev/angular/datev-message`:
     * Anzeige der Id aus Popover entfernt
  * `@datev/bootstrap`:
    * Styleanpassung der datev-message-popover Komponente


# 16.05.2017 (v2.1.3)
  * Aktualisierung der Paketversionen auf 2.1.3
  * **Features:**
    * `@datev/bootstrap`:
      * Style für Icons über .icon-Klasse
      * Update Responsive Layout Basics
      * Dunkelgrauer Rahmen um Anwendung entfernt


# 15.05.2017 (v2.1.2)
  * Aktualisierung der Paketversionen auf 2.1.2
  * **Features:**
    * `@datev/bootstrap`:
      * Style für text-select (Text der mit der vom Nutzer selektiert wird - z.B. für Copy) (#159)
      * Style für placeholder in textareas
  * **Bugfix:**
    * `@datev/angular`:
      * NotificationService löschen von Meldungen wenn diese keine Id haben (#177)

# 05.05.2017 (v2.1.1)
  * **Features:**
    * `@datev/angular`:
      * Tagging-Control (#118)

# 25.04.2017 (v2.1.0)
  * **Breaking Changes:**
    * `@datev/angular`:
      * Refactoring und Umbenennung von `DatevMessageOutletModule` zu `DatevMessageModule`

# 06.04.2017 (v2.0.0)
* Verschiebung des Projekts in die Gruppe `WebAppCommunity/frontend`
* **Breaking Changes:**
  * Umbennenung des Scopes von `@datev-ria` nach `@datev` und Umbennung des Pakets `angular2` nach `angular` in Angleichung an Angular
  * Anpassung der package.json auf die neuen Pakete mit den neuen Versionen notwendig `"@datev/angular": "^2.0.0"`, `"@datev/bootstrap3": "^2.0.0"`, etc.
  * Anpassung der Imports in den Modulen und Komponenten der Angular-Anwendung notwendig

# 29.03.2017 (v1.5.0)

* Umstellung auf angular Version 4.0.0
* **Fixes**
  * Textbox Styles bei Warning und Info gefixt (#141)
  * Anpassung Hilfe-Button (in Modals) (#144)

# 15.03.2017 (v1.4.0)
  * **Breaking Changes:**
    * `@datev-ria/logging`:
      * verlässt Alpha-Status.
      * *ILogMessage*-Attribut *messageType* in *category* umbenannt.

# 14.03.2017 (v1.3.2)
  * **Fixes:**
    * Anpassungen aufgrund der Verwendung von Webpack im PoS (#125)
    * DatevMessageService Interface entspricht nicht üblichen JS Code-Konventionen (#127).

# 07.03.2017 (v1.3.0)
  * **Features:**
    * `@datev-ria/angular2`: Implementierung von Angular `ErrorHandler`-Interface mit Verbindung zu `@datev-ria/logging`.
  * **Fixes:**
    * Datev Message wird nicht bereits bei der Initialisierung ausgewertet (#124)
    * Anpassungen aufgrund der Verwendung von Webpack im PoS (#125)
    * ErrorProvider: Fehlermeldungen mit gleicher Id werden öfters dargestellt (#130)
    * Alert: Fokus nicht auf Schließen-Button setzen (#129)
    * Notification Alert schließen durch Aufrufer (#119)
    * Zeilenumbruch im Text einer Notification (#126)
    * Datev Message - Funktion zum Löschen aller Messages (#123)
    * PMS Breadcrumb Fix (#121)
    * Update auf TSLint 4.x (#83)
    * Notification: Hovereffekt fehlt für Standardbutton (#116)
    * Breadcrumb-Flag Route Data (#112)
    * Notification Vorgabe des fokusierten Buttons (#108)

# 08.02.2017 (v1.2.0)

* Update der npm-Module folgender Module
  * angular2
  * bootstrap3
  * core
  * logging
* Publishing folgender Module in der Version 1.2.0
  * angular2
  * bootstrap3
  * core

# 18.01.2017

* Einführung des neuen NgModule `DatevNotificationService` in `@datev-ria/angular2`

# 11.01.2017

* Update des angular2-Moduls auf Version 1.0.7 aufgrund der Anpassung des Sidebarverhaltens für xs-Bildschirmgrößen (#55)
* Update des bootstrap3-Moduls auf Version 1.0.1 aufgrund der Anpassung der Sidebar Styles für xs-Bildschirmgrößen (#55)

# 16.12.2016

* Logging: vereinfachte Verwendung des LogService mit Dependency Injection (#87)

# 15.11.2016

* Einführung und Dokumentation des `NgModule` `DatevCoreModule`
* Erweiterung des Unit Testing der Komponenten

# 24.10.2016

* Umstellung einzelner less-Variablen von ceil auf round um eine Nachkommastelle abbilden zu können.

# 19.10.2016

* Update auf Bootstrap-Version 3.3.7

# 14.10.2016

## Neuerungen:

Anpassung und Erweiterung der Listen-Styles
* Änderung der Hover- und Pressed-Effekte
* Neu: Interaktive Listen können durch Klasse .dna-list-group-links ausgezeichnet werden
* Neu: Listen können mit Klasse .dna-list-group-condensed in verschmälert werden
* Klasse .dna-jumplist deprecated - ersetzt durch .dna-list-group-links und .dna-list-group-condensed

# 13.10.2016

## Neuerungen:

* Migration auf Angular 2 Release Version 2.1.0
* Aktualisierung alles node modules im node_modules.zip inklusive @datev-ria-Module
* Umstellung auf Typescript 2.0.3
* Umstellung von Typngs auf @Types bis auf jQuery-Typings
