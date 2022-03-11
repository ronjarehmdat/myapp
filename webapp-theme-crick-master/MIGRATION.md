# Migration Guide

Dieser Guide soll bei der Migration von *webapp-theme-crick 2.x* nach *webapp-theme-crick v3.x* helfen im Zuge dessen eine Umstellung von Bootstrap3 auf Bootstrap4 erfolgt.

> Wenn unser Guide Dir an einem Punkt nicht nehr weiter hilft, konsultiere bitte auch den **[offiziellen und vollständige Bootstrap Migration Guide](https://i/getbootstrap.com/docs/4.1/migration/)**. Bist Du der Meinung, dass bestimmte Informationen fehlen, eröffne ein GitLab-Issue.

Wir gehen davon aus, dass das Informationsbedürfnis unterschiedlich ist und haben das Dokument daher grob in zwei Teile für die folgenden beiden Zielgruppen unterteilt:

- **HTML-Template-Autoren** binden das vorkompilierte CSS-Theme ein, entwickeln fachliche Angular-Oberflächen und interessieren sich hauptsächlich für geänderte CSS-Klassen und deren Verwendung. Sie finden einen Überblick über die wichtigsten Änderungen. Konkrete Verwendungsbeispiele werden wie bisher separat in einer überarbeiteten Variante von [MAP (go/map)](go/map) bzw. der [offiziellen Boostrap-Doku](https://i/getbootstrap.com/docs/4.1/migration/) gegeben.

- **Theme-Autoren** kompilieren ein modifiziertes ("customized") *webapp-theme-crick* aus den LESS-/SCSS-Sourcen. Sie nutzen oder überschreiben u.U. einige Theme-Variablen, nutzen Mixins oder erweitern Style-Klassen. Diese Zielgruppe dürfte sich zusätzlich für Unterschiede zw. [LESS](http://i/lesscss.org/) und [SASS](https://i/sass-lang.com/) sowie geänderte Variablennamen interessieren. Sie interessieren sich evtl. auch für den [Customizing-Guide](./doc/customizing.md).

## Inhalt

### ...für HTML-Template-Autoren

- [Seitenaufbau](#seitenaufbau)
   - [DNA-Page & DNA-Wrapper](#dna-page-und-dna-wrapper)
   - [Header](#header)
   - [Container](#container)
- [Breakpoints](#breakpoints)
- [Layout Grid](#layout-grid)
- [Margins und Paddings](#margins-und-paddings)
- [Schriftgrößen](#schriftgrößen)
- [Visibilty-Utilities](#visibilty-utilities-hidden-visible-)
- [Flexbox](#flexbox)
- [UI-Elemente / Komponenten](#ui-elemente-komponenten)
    - [.card statt .panel](#card-statt-panel)
    - [Formulare](#formulare)
    - [Checkboxen & Radio-Buttons](#checkboxen-und-radio-buttons)
    - [DATEV-Gallery](#datev-gallery)

- [Änderungen bei CSS-Klassen](#entfernte-deprecated-css-klassen)

### ...für Theme-Autoren

- [Umstieg von LESS auf SASS](#umstieg-von-less-auf-sass)
- [Unterschiede zwischen LESS und SASS](#unterschiede-zwischen-less-und-sass)
- [Geänderte Variablennamen](#geänderte-variablennamen)
- [Breakpoints und Media Queries](#breakpoints-und-media-queries)


# ... für HTML-Template-Autoren

## Seitenaufbau
Der Seitenaufbau vereinfacht sich deutlich und sollte dadurch flexibler einsetzbar sein und besser auf Mobilgeräten funktionieren.

### DNA-Page und DNA-Wrapper

* Die Klasse/ID `dna-wrapper` entfällt und damit ist diese Ebene nicht mehr notwendig
* Die Klasse/ID `dna-page`, sowie `dna-page-header-fixed` und `dna-page-header-fixed-extended` entfallen. Damit ist diese Ebene nicht mehr notwendig. Wenn der Header "fixed" sein soll, erhält er selbst die entsprechende Klasse. (s.u.)

### Header
* Das generelle Verhalten des Headers verändert sich nicht - nur die Konstruktion
* Ein fixer (sticky) Header wird jetzt durch die Klasse `.dna-header-fixed` zusätzlich zu `.dna-header` erzeugt.
    * ***ACHTUNG***: Im IE11 kommt es hier zu kleineren Problemen: Der Content-Bereich `<main>` muss durch eine passende `margin-top` nach unten geschoben werden, sodass er unterhalb des Headers rutscht.
* Die Höhe des Headers wird nur noch durch seinen Inhalt bestimmt - er passt sich flexibel an.
* Innerhalb des Headers wird die Klasse `.dna-header-body`eingesetzt werden um die responsiven Paddings zu erhalten.
* Die Klassen `.dna-header-main` und `.dna-header-function` entfallen - sie können durch `.dna-header-item` ersetzt werden. Für die richtige Positionierung müssen ggf. weitere Klassen wie `.text-right` oder eigener Code hinzugfügt werden.
* Die Alerts wandern in den Header: Der `<datev-notification-outlet>` wird dazu in ein div mit der Klasse `dna-alert-wrapper` geschoben.

Ein typischer, fixer Header kann so aussehen:
```` html
<header class="dna-header dna-header-fixed">
  <div class="dna-header-body">
    ...
  </div>
  <div class="dna-alert-wrapper">
    <datev-notification-outlet></datev-notification-outlet>
  </div>
</header>
````

### Container

* Die Klasse `dna-container-scroll` entfällt - es reicht die Klasse `dna-container` an allen Stellen (wie gehabt zusätzlich zum Bootstrap `container` oder `container-fluid`).´
* Die Klasse `dna-container-scroll-footer` entfällt - das passende Verhalten für eine Seite mit Footer muss derzeit selbst implementiert werden. Contributions sind willkommen.

## Breakpoints

Mit Bootstrap 4 ist ein neuer Breakpoint hinzugekommen: XL. Entsprechend wurden die bisherigen Breakpoints leicht angepasst.

|     |  BS3   |  **BS4**   |                            Typ                             |
| --- | ------ | ---------- | ---------------------------------------------------------- |
| XS  | 320px  | (320px)    | kleine Geräte (Smartphone Portrait)                        |
| SM  | 640px  | **640px**  | mittelkleine Geräte (Smartphone Landscape, kleine Tablets) |
| MD  | 1008px | **992px**  | mittlere Geräte (Tablets, kleine Laptops)                  |
| LG  | 1300px | **1200px** | größere Geräte (Laptops)                                   |
| XL  | -      | **1560px** | sehr große Geräte (Bildschirme mit Full-HD)                |

*Der angebene Wert ist jeweils die unterste Grenze*

**Geräte mit hoher Pixeldichte**:
4K-Monitore, Retina-Displays und andere Bildschirme mit einer hohen Auflösung (high-dpi) werden vom Browser entsprechend ihrer Pixeldichte umgerechnet, sodass sie in diese Breakpoints fallen. Beispiel: Ein iPad mit einer Auflösung von 1536 x 2048 physikalischen Pixeln wird vom Browser wie 768 x 1024 Pixel behandelt.

Zur Verwendung der **Breakpoints in Media-Queries** siehe unten.

## Layout Grid

*webapp-theme-crick* unterstützt zukünftig ein 12-Spalten-Grid (`dna-theme.css`) und ein 18-Spalten-Grid (`dna-theme-grid18.css`). Mehr Details siehe [hier](./doc/grid.md).
Bootstrap4 setzt intern für sein Layout-Grid nun auf [Flexbox](https://i/developer.mozilla.org/de/docs/Web/CSS/CSS_Flexible_Box_Layout/Grundlegende_Konzepte_der_Flexbox). Die Nutzung mit `.row` und `.col-*` ist aber im Wesentlichen gleich geblieben.

> Sehr zu empfehlen ist hier das Kapitel **["Grid system" in der Bootstrap-Dokumentation](https://i/getbootstrap.com/docs/4.1//layout/grid/)**

### XS Column Klassen (col-xs-\*)
In den Columns entfallen die Größenangaben für die `xs`-Bildschirmgröße. Alle anderen Breakpoints sind gleich geblieben.

|    BS3    |    BS4    | Beispiel |
| --------- | --------- | -------- |
| col-\*-\* | col-\*-\* | col-sm-5 |
| col-xs-\* | col-\*    | col-5    |


### Offset Klassen (col-offset-\*)
In den `offset`-Klassen entfällt das führende `col`. Außerdem entfällt für die offsets in der `xs`-Größe die Größenangabe.

|       BS3        |     BS4      |  Beispiel   |
| ---------------- | ------------ | ----------- |
| col-offset-\*-\* | offset-\*-\* | offset-sm-5 |
| col-offset-xs-\* | offset-\*    | offset-5    |


### Grid für Formulare

`row-form` war bisher eine DNA-eigene Klasse. In BS4 bringt BS mit `form-row` eine identische Klasse. Sie liefert ein engeres Grid, dass besser für Formulare passt.
Bei horizontalen Formularen (Label steht links neben Input) wird das `.control-label` zu `.col-form-label`, bei anderen entfällt die Klasse.

|      BS3      |      BS4       |                                    Anmerkung                                    |
| ------------- | -------------- | ------------------------------------------------------------------------------- |
| row-form      | form-row       | Die Kombinationen `class="row row-form"` wird durch `class="form-row"` ersetzt. |
| control-label | -              | Bei vertikalen Formularen                                                       |
| control-label | col-form-label | Nur bei horizontalen Formularen                                                 |

Details zum Formularaufbau findet sich unter [Formulare](#formulare).


## Margins und Paddings

Bootstrap 4 bringt ein eigenes System zur Erstellung von Margins und Paddings mit, welches wir jetzt nutzen. Damit gehen einige Änderungen einher.

### Grundsystematik für Herleitung des CSS-Klassennamens in BS3 / BS4

`.{klasse}{orientierung}-{abstand}`

wobei gilt: `{orientierung}` ist in BS4 optional. Fehlende Orientierung bedeutet *Abstand zu allen Seiten*.

#### Klasse

| Klasse  |      BS3       |  BS4   |
| ------- | -------------- | ------ |
| margin  | .dna-margin-\* | **.m** |
| padding | -              | **.p** |

#### Orientierung

|      Orientierung      |  BS3   |  BS4  |
| ---------------------- | ------ | ----- |
| top                    | top    | **t** |
| bottom                 | bottom | **b** |
| left                   | left   | **l** |
| right                  | right  | **r** |
| left & right (x-Achse) |        | **x** |
| top & bottom (y-Achse) |        | **y** |

#### Abstände

Die Systematik der Faktoren hat sich gegenüber BS3 **nicht** geändert - und damit auch nicht die entsprechenden Suffixe. Eine 1:1-umstellung ist somit möglich.
Es sind für BS4 lediglich zwei neue Faktoren hinzugekommen:

|        dp         | BS3 |   BS4   |                       |
| ----------------- | --- | ------- | --------------------- |
| 0                 | -   | **0**   |                       |
| 4dp  (Faktor 0,5) | -   | **hx**  | neu                   |
| 8dp  (Faktor 1)   | 1x  | **1x**  | Grundwert (Faktor 1x) |
| 12dp (Faktor 1,5) | 1hx | **1hx** |                       |
| 16dp (Faktor 2)   | 2x  | **2x**  |                       |
| 24dp (Faktor 3)   | 3x  | **3x**  |                       |
| 32dp (Faktor 4)   | -   | **4x**  | neu                   |
| 40dp (Faktor 5)   | 5x  | **5x**  |                       |
| 64dp (Faktor 8)   | 8x  | **8x**  |                       |

#### Beispiele: BS4 (neu)

|     Abstände      |   Variablen    | Abstand nach oben | Abstand nach unten | Abstand nach links | Abstand nach rechts |     |
| ----------------- | -------------- | ----------------- | ------------------ | ------------------ | ------------------- | --- |
| 0                 |                | .mt-0             | .mb-0              | .ml-0              | .mr-0               | neu |
| 4dp  (Faktor 0,5) | $dna-space-hx  | .mt-hx            | .mb-hx             | .ml-hx             | .mr-hx              | neu |
| 8dp  (Faktor 1)   | $dna-space-1x  | .mt-1x            | .mb-1x             | .ml-1x             | .mr-1x              |     |
| 12dp (Faktor 1,5) | $dna-space-1hx | .mt-1hx           | .mb-1hx            | .ml-1hx            | .mr-1hx             |     |
| 16dp (Faktor 2)   | $dna-space-2x  | .mt-2x            | .mb-2x             | .ml-2x             | .mr-2x              |     |
| 24dp (Faktor 3)   | $dna-space-3x  | .mt-3x            | .mb-3x             | .ml-3x             | .mr-3x              |     |
| 32dp (Faktor 4)   | $dna-space-4x  | .mt-4x            | .mb-4x             | .ml-4x             | .mr-4x              | neu |
| 40dp (Faktor 5)   | $dna-space-5x  | .mt-5x            | .mb-5x             | .ml-5x             | .mr-5x              |     |
| 64dp (Faktor 8)   | $dna-space-8x  | .mt-8x            | .mb-8x             | .ml-8x             | .mr-8x              |     |

- für **Paddings** ersetze in obigen Tabellen `m` durch `p`.
   - Beispiel: `.pt-1hx` entspricht "*padding-top = 1,5-faches des Basisabstands*"
- für Kombinationen ***links und rechts*** (x-Achse) verwende z.B. `.mx-...` oder `.px-...`
- für Kombinationen ***oben und unten*** (y-Achse) verwende z.B. `.my-...` oder `.py-...`
- für gleichmäßige Verteilung in **alle Richtungen** lasse Kürzel für die Orientierung weg, d.h. z.B. `.m-1hx`
- *Anmerkung:* die Standard Bootstrap *sizes* können nicht verwendet werden
- vgl. Kapitel ["Spacing" in Bootstrap-Dokumentation](https://i/getbootstrap.com/docs/4.1/utilities/spacing/#notation)

#### Beispiele: BS3 (bisher)

|     Abstände      |    Variablen    |  Abstand nach oben  |   Abstand nach unten   |  Abstand nach links  |  Abstand nach rechts  |
| ----------------- | --------------- | ------------------- | ---------------------- | -------------------- | --------------------- |
| 8dp  (Faktor 1)   | @dna-margin-1x  | .dna-margin-top-1x  | .dna-margin-bottom-1x  | .dna-margin-left-1x  | .dna-margin-right-1x  |
| 12dp (Faktor 1,5) | @dna-margin-1hx | .dna-margin-top-1hx | .dna-margin-bottom-1hx | .dna-margin-left-1hx | .dna-margin-right-1hx |
| 16dp (Faktor 2)   | @dna-margin-2x  | .dna-margin-top-2x  | .dna-margin-bottom-2x  | .dna-margin-left-2x  | .dna-margin-right-2x  |
| 24dp (Faktor 3)   | @dna-margin-3x  | .dna-margin-top-3x  | .dna-margin-bottom-3x  | .dna-margin-left-3x  | .dna-margin-right-3x  |
| 40dp (Faktor 5)   | @dna-margin-5x  | .dna-margin-top-5x  | .dna-margin-bottom-5x  | .dna-margin-left-5x  | .dna-margin-right-5x  |
| 64dp (Faktor 8)   | @dna-margin-8x  | .dna-margin-top-8x  | .dna-margin-bottom-8x  | .dna-margin-left-8x  | .dna-margin-right-8x  |


#### Margins mit xs, sm, md, lg

In einer frühen Version vom webapp-theme-crick wurden Margin-Klassen mit `-sm` und ähnlichen Suffixen eingesetzt anstatt `*-2x`.

Diese rechnen sich folgendermaßen um:

| Crick Version < 3.0 |   BS4   |
| ------------------- | ------- |
| dna-margin-\*-xs    | m\*-1x  |
| dna-margin-\*-sm    | m\*-1hx |
| dna-margin-\*-md    | m\*-2x  |
| dna-margin-\*-lg    | m\*-3x  |


**IE11-Fix**

Beispiel-Code, um den Content für den IE11 unter dem Header herauszuziehen. Der Wert (*hier 12rem*) muss der Headergröße angepasst werden. Alternativ kann dies auch mit Javascript passend berechnet werden.
```` SCSS
@include media-breakpoint-up(sm) {
    main {
        margin-top: 12rem;
        @supports (position: sticky) {
            margin-top: 0;
        }
    }
}
````

## Schriftgrößen

Mit der Umstellung wurde auch entschieden die Grundschriftgröße von 13dp auf **14dp** anzuheben. Entsprechend wurden auch die Überschriften vergrößert.

|              | Alt  | Neu  |
| ------------ | ---- | ---- |
| H1           | 32dp | 32dp |
| H2           | 22dp | 24dp |
| H3           | 18dp | 21dp |
| H4           | 16dp | 17dp |
| H5           | 14dp | 16dp |
| H6           | 13dp | 14dp |
| Text         | 13dp | 14dp |
| kleiner Text | -    | 13dp |

## Visibilty-Utilities (hidden-\*, visible-\*)
Die `visible`- und `hidden`-Klassen wurden durch ein neues Set an `d-*`-Klassen ersetzt.

Auch hier entfallen die Größenangaben für die `xs`-Bildschirmgröße.

|           BS3           |             BS4             |
| ----------------------- | --------------------------- |
| visible-xs              | d-block d-sm-none           |
| visible-xs-inline-block | d-inline-block d-sm-none    |
| hidden-xs visible-sm    | d-none d-sm-block d-md-none |

Für weitere Informationen, siehe [Bootstrap 4 Dokumentation](https://i/getbootstrap.com/docs/4.1/utilities/display/).


## Flexbox
Bisher wurden einzelne Klassen für die einfache Verwendung von Flexbox angeboten, diese entfallen zugunsten des umfänglichen Angebots von Bootstrap 4: [Flexbox-Utitlies](https://i/getbootstrap.com/docs/4.1/utilities/flex/)

Die bisherigen Klassen haben darin folgende Entsprechungen:

|       BS3       |                BS4                 |
| --------------- | ---------------------------------- |
| flex            | d-flex                             |
| flex-baseline   | d-flex align-items-baseline        |
| flex-item-right | text-right ml-auto                 |
| flex-item-major | flex-grow-\*  siehe Bootstrap-Doku |
| flex-item-minor | entfällt                           |


## UI-Elemente / Komponenten

### .card statt .panel

Mit Bootstrap 4 wurden die bisherigen "Panels" durch "Cards" abgelöst. Für die Anwendungen hat das Änderungen im Markup und CSS/SCSS zur Folge:
Im Normalfall ist diese Umstellung mittels eines globalen Find & Replace von `panel` zu `card` durchführbar, da alle Variablen und Klassen so ersetzt wurden (z. B. `.dna-panel-info` -> `.dna-card-info`).

##### Gruppen von Cards/Panels
`row row-panels` entfallen und werden durch `card-deck` oder nur `row dna-card-deck` ersetzt.
Die Bootstrap-Klasse `.card-deck` basiert auf Flexbox und bringt einige Layout-Vorteile mit sich.
Die Klasse `.dna-card-deck` zieht die Cards nach außen, sodass der Platz auf der Seite optimal genutzt wird und der Inhalt mit Elementen außerhalb der Cards bündig ist.

|    BS3         |           BS4           |            Anmerkung            |
| -------------- | ----------------------- | ------------------------------- |
| row row-panels | row dna-card-deck       | Cards werden nach außen gezogen |
| row row-panels | card-deck               | Cards bleiben eingerückt        |


### Formulare

Es gibt horizontale und vertikale Formulare - dabei unterscheidet sich der Aufbau. Entweder ist das Label oberhalb des Inputs oder links davor.

Wichtig bei allen Formuleren ist: Das `label` und das `input` werden über die `id="<id>"` des inputs verbunden. Dazu muss im `for`-attribut des Labels as `for="<id>"` die ID des Inputs eingesetzt werden.

##### Vertikale Formulare

Hier gilt die Struktur von [Bootstrap](https://i/getbootstrap.com/docs/4.1/components/forms/). Zu beachten: das Label hat hier keine Klasse mehr.

Beispiel
```` html
<form>
  <div class="form-group">
    <label for="exampleFormControlInput1">E-Mail-Adresse</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
  </div>
  ...
<form>
````

##### Horizontale Formulare

Horizontale Formulare haben eine Layout-Grid Struktur. Statt `.row` wird hier `.form-row` eingesetzt.
Änderungen BS3 siehe unter [Grid für Formulare](#grid-fuer-Formulare)

Beispiel
```` html
<form>
  <div class="form-row">
    <label class="col-sm-4 col-md-6 col-form-label" for="exampleFormControlInput2">Nachname</label>
    <div class="col-sm-8 col-md-6">
      <input type="text" name="exampleFormControlInput2" class="form-control" id="exampleFormControlInput2"/>
    </div>
  </div>
  ...
<form>
````

### Checkboxen und Radio-Buttons

In Bootstrap 4 wurde die Klasse `.checkbox` ersetzt durch `.form-check` (div)
und die beiden Klassen `.form-check-input` (input) und `.form-check-label`
neu aufgenommen.

*Bisher*
```html
<div class="checkbox">
    <input id="checkbox1" type="checkbox" />
    <label for="checkbox1">Checkbox</label>

    <input id="radio1" type="radio" />
    <label for="radio1">Radio</label>
</div>
```

*Neu*
```html
<div class="form-check">
    <input class="form-check-input" id="checkbox1" type="checkbox"/>
    <label class="form-check-label" for="checkbox1">Checkbox</label>

    <input class="form-check-input" id="radio1" type="radio"/>
    <label class="form-check-label" for="radio1">Radio</label>
</div>
```

### DATEV-Gallery

Die Gallery-Komponente wurde deutlich verschlankt. Äußere Strukturen wie `.row` `.col-*` und die umgebende `.card` wurden aus der Komponente entfernt. Sie können individuell innerhalb des Projektes wieder hinzugefügt werden, da die `datev-gallery` sich in beliebige umgebenden Strukuren einfügen lässt. Die Listen-Struktur innerhalb (inklusive horizontaler Linien) wurde entfernt.




## Änderungen bei CSS-Klassen

### Umbenannte Klassen
* `.btn-help` umbenannt zu `.dna-btn-help`


### Entfernte / Deprecated CSS-Klassen

##### container-scroll
* `.container-scroll` entfällt zugunsten von `.dna-container`
* `.container-scroll-footer` entfällt

##### dna-wrapper
* `.dna-wrapper`/`#dna-wrapper` entfällt

##### dna-header
* `.dna-header-main` entfällt
* `.dna-header-function` entfällt

##### Flexbox
* `.flex-*`-Klassen entfällt zugunsten von Bootstrap-Flexbox-Utilities: https://i/getbootstrap.com/docs/4.1/utilities/flex/
siehe [Flexbox](#flexbox)

##### Sonstige
* Bootstraps `.page-header` und Anpassungen entfallen


# ... für Theme-Autoren

## Umstieg von LESS auf SASS

- Hinweise zu Konfiguration und Bau eines Projekts mit SASS finden sich im neuen [Customizing-Guide](./doc/customizing.md)

## Unterschiede zwischen LESS und SASS

- Variablen beginnen in SASS mit `$` (LESS: `@`)
- Imports
    - Imports von benachbarten SCSS-Files können ohne Dateieindung (und bei *Partials* ohne den führenden Unterstrich im Dateinamen) erfolgen.
    - Imports von CSS-Ressourcen über URLs benötigen `url()` z.B. `@import url("http://...")`. (LESS: `@import http://...`)
    - Wird beim Import eine Dateiendung angegeben, muss auch der führende Unterstrich angegeben werden
- Relative Pfade in SCSS-Files werden *relativ zur Entry-.scss-Datei* aufgelöst. Anwendungen, die ihre CSS-Files selbst kompilieren (d.h. statt `dna-theme.css` z.b. `dna-theme-components.scss` einbinden) müssen die Pfad-Variable `$dna-assets-path` überschreiben oder den `resolve-url-loader` für Webpack verwenden (vgl. [Customizing Guide](./doc/customizing.md) bzw. Issue #63). In vielen Fällen können die Pfadvariablen wie folgt gesetzt werden (`~` löst Webpack per Default zu `./node_modules` auf):

    *custom.scss*
    ```scss
    @import "~@datev/webapp-theme-crick/assets/scss/_variables.scss";
    $dna-assets-path: "~@datev/webapp-theme-crick/assets";
    @import "~@datev/webapp-theme-crick/assets/scss/dna-theme-components.scss";
    ...
    ```

- Offizielle Dokumentation zu SASS
  - [https://sass-lang.com](https://i/sass-lang.com/)


### Geänderte Variablennamen

In Bootstrap haben sich zahlreiche Variablennamen geändert. Auch im DNA-Theme haben sich Namen geändert.
Die folgenden Tabellen listen die wichtigsten Änderungen, erheben allerdings keinen Anspruch auf Vollständigkeit.
Im Zweifel, konsultiere den offiziellen Bootstrap Migration Guide bzw. falls DNA-Variablen fehlen, eröffne ein Issue.

#### Variablen für Abstände

Grundabstand:

| Wert |       BS3        |    BS4    |
| ---- | ---------------- | --------- |
| 8dp  | @dna-margin-base | `$spacer` |

`@dna-margin-base` war bisher eine DNA-eigene Variable. BS4 bringt mit `$spacer` eine identische Variable mit, die sich dem Namen nach zudem nicht mehr nur auf Margins beschränkt und z.B. auch für Paddings verwendet werden kann. Für Vielfache des Grundabstands gibt es Variablen nach der Systematik `$dna-spacer-{abstand}`, z.B.

- `$dna-spacer-hx` (Hälfte des Grundabstands)
- `$dna-spacer-2x` (Doppeltes des Grundabstands)
- weitere Vielfache vgl. ["Abstände" im Abschnitt für HTML-Template-Autoren](#abstände))

#### Wrapper

|            BS3            |     BS4      |
| ------------------------- | ------------ |
| @dna-wrapper-border-width | - entfällt - |

##### Statusfarben

|      BS3       |   BS4    |
| -------------- | -------- |
| @brand-primary | $primary |
| @brand-success | $sucess  |
| @brand-info    | $info    |
| @brand-warning | $warning |
| @brand-danger  | $danger  |

##### Borders

|         BS3         |      BS4       |
| ------------------- | -------------- |
| $border-radius-base | $border-radius |

##### Font Sizes

|      BS3      |      BS4      |
| ------------- | ------------- |
| @font-size-h1 | $h1-font-size |
| @font-size-h2 | $h2-font-size |
| @font-size-h3 | $h3-font-size |
| @font-size-h4 | $h4-font-size |
| @font-size-h5 | $h5-font-size |
| @font-size-h6 | $h6-font-size |

##### Panels / Cards

|          BS3          |                           BS4                            |
| --------------------- | -------------------------------------------------------- |
| @panel-default-border | $card-border-color                                       |
| @panel-body-padding   | $dna-card-body-padding / $card-spacer-y / $card-spacer-x |
| @panel-\*             | $card-\*                                                 |

##### Tables

|        BS3         |       BS4        |
| ------------------ | ---------------- |
| @table-bg          |                  |
| @table-bg-accent   | $table-accent-bg |
| @table-bg-hover    | $table-hover-bg  |
| @table-bg-active   | $table-active-bg |
| @dna-table-head-bg | $table-head-bg   |

##### Inputs

|         BS3         |       BS4        |
| ------------------- | ---------------- |
| @input-height-base  | $input-height    |
| @input-height-small | $input-height-sm |
| @input-height-large | $input-height-lg |

##### ZIndex

|        BS3         |      BS4      |
| ------------------ | ------------- |
| @zindex-...-fixed  | $zindex-fixed |
| @dna-zindex-footer | - entfällt -  |

### Breakpoints und Media-Queries

Für die Verwendung der media-queries wurden in Bootstrap die drei mixins `media-breakpoint-up`, `media-breakpoint-down` und `media-breakpoint-only` erstellt,
die mit den Schlüssel `xs`, `sm`, `md`, `lg` und `xl` aufgerufen werden können. Sie geben jeweils die Gültigkeitsbereiche der umklammerten Regeln an.

Vorsicht: Alle drei Mixins gelten für die dahinter angegebene Bildschirmgröße!

|         mixin         |                                     Beschreibung                                     |
| --------------------- | ------------------------------------------------------------------------------------ |
| media-breakpoint-up   | Umfasst alle Bildschirmgrößen, die **größer oder gleich** der angegebene Größe sind  |
| media-breakpoint-down | Umfasst alle Bildschirmgrößen, die **kleiner oder gleich** der angegebene Größe sind |
| media-breakpoint-only | Umfasst nur die angegebene Bildschirmgröße                                           |

#### Beispiele

```scss
/* VORHER: @media (min-width: @screen-sm-min) { */
@include media-breakpoint-up(sm) {
    /* das hier gilt nicht für XS-Screens (sondern für SM und größer) */
}

/* VORHER: @media screen and (max-width: @screen-xs-max) { */
@include media-breakpoint-down(xs) {
    /* das hier gilt ausschließlich für XS-Screens */
}
```
