# 12-Spalten-Grid

Mit dem Umstieg auf Bootstrap 4 ist das Standard-Grid für neue Anwendungen ein 12-Spalten-Grid. Anwendungen die bereits auf das 18-Spalten-Grid setzen, können zukünftig **dna-theme-grid18.css** einbinden. Es handelt sich dabei um ein zu *dna-theme.css* identisches Theme in 18-Spalten-Ausführung.

> **Beachte:** Die Verwendung des 18-Spalten-Grid ist eine Entscheidung des Projekts und sollte in Abstimmung mit dem Designer im Projekt getroffen werden.

 Bestandsanwendungen, die [eine Customized-Variante von *webapp-theme-crick* bauen](./customizing.md), können die Spaltenanzahl über die Bootstrap-Variable `$grid-columns` einstellen:

- `$grid-columns: 12;` (Default)
- `$grid-columns: 18;` (Rückwärtskompabitilität)

Durch die Anpassung des Grids werden zusätzliche CSS-Klassen generiert, bspw. `col-13`, `col-14`, ..., `col-18`.
