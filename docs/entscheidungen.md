# Designentscheidungen

Kurze Begründungen für die wichtigsten technischen Entscheidungen.

## Spring Boot + JPA + PostgreSQL

**Entscheidung:** Java 17 mit Spring Boot (Web MVC, Data JPA) und PostgreSQL.

**Warum:** Spring Boot ist im Unternehmensumfeld Standard, bringt Dependency Injection,
REST-Controller und Datenbankzugriff ohne viel Konfiguration mit, und Spring Data JPA erspart
Boilerplate für einfache CRUD-Ressourcen. PostgreSQL ist robust und läuft problemlos im Container.

**Historie:** Die erste Version speicherte Daten in CSV-Dateien. Der Umstieg auf PostgreSQL
brachte Beziehungen zwischen den Daten, gleichzeitige Zugriffe und eine echte Datenbank als
Grundlage für die weiteren Module.

## Kassenstände als fortlaufender Verlauf

**Entscheidung:** Bierkonto, Bierkasse und Inventarwert werden nicht als Zähler überschrieben,
sondern jede Änderung legt einen neuen Kassenstand mit Kommentar an.

**Warum:** Der Bierwart muss nachvollziehbar belegen können, wie ein Stand zustande kam. Ein Verlauf beantwortet „wann und warum hat sich der Wert geändert?“ ohne
zusätzliche Audit-Tabelle, und Korrekturen sind als eigene Einträge sichtbar.

**Konsequenzen:** Der aktuelle Stand ist der jüngste Eintrag. Ein manueller Anfangsbestand wird
einmalig angelegt.

## Beträge als `BigDecimal`

**Entscheidung:** Alle Geldbeträge sind `BigDecimal` im Backend und `numeric` in der Datenbank.

**Warum:** Gleitkommazahlen können Beträge wie 0,10 € nicht exakt darstellen; bei vielen kleinen
Buchungen summieren sich die Fehler. `BigDecimal` rechnet exakt.

## Inventur mit eingefrorenem Sollbestand

**Entscheidung:** Beim Start einer Inventur werden Bestand und Einkaufspreis jedes Getränks in
eigene Inventureinträge kopiert.

**Warum:** Eine Inventur kann sich über mehrere Tage ziehen. Ändert sich in der Zeit ein Preis
oder der Bestand, bleibt der Vergleich trotzdem gegen den Stand zum Inventurbeginn – und der
Bericht ist auch später noch reproduzierbar.

## PDF-Berichte im Backend

**Entscheidung:** Berichte werden serverseitig mit OpenPDF erzeugt und als `application/pdf`
ausgeliefert.

**Warum:** Ein PDF lässt sich ausdrucken, aushängen und weitergeben. Im Backend liegen alle Daten bereits vor, das Layout ist unabhängig
vom Browser. OpenPDF steht unter MPL-2.0/LGPL-2.1 und passt damit zur Lizenzpolitik des Projekts.

## Nginx als Reverse Proxy, eine Origin

**Entscheidung:** Der Frontend-Container liefert die App aus und leitet API-Pfade an das Backend
weiter; das Backend hat keinen eigenen Port nach außen.

**Warum:** Frontend und API laufen unter derselben Adresse, das Backend ist nur über den Proxy
erreichbar, und der Frontend-Code kennt keine Backend-URL. In der Entwicklung bildet der
Vite-Proxy dasselbe Verhalten nach.

## Multi-Stage-Docker-Builds, Nicht-Root-Container

**Entscheidung:** Maven und Node laufen nur in der Build-Stufe; die Laufzeit-Images enthalten
nur JRE bzw. Nginx mit den gebauten Dateien. Das Backend läuft als unprivilegierter Benutzer.

**Warum:** Kleinere Images, weniger Angriffsfläche, und ein kompromittierter Prozess hat keine
Root-Rechte im Container.

## Lizenzprüfung im Build

**Entscheidung:** Maven (`license-maven-plugin`) und npm (`license-checker`) prüfen bei jedem
Build die Lizenzen aller Abhängigkeiten gegen eine Positivliste und erzeugen
`THIRD_PARTY_LICENSES.txt`.

**Warum:** Das Projekt ist nicht Open Source; eine GPL-/AGPL-Abhängigkeit würde dazu im
Widerspruch stehen. Die Prüfung verhindert, dass eine solche Abhängigkeit unbemerkt hineinrutscht,
und die Lizenzhinweise der verwendeten Bibliotheken werden automatisch mitgeliefert.

## Schrittweise Migration nach TypeScript

**Entscheidung:** Das Frontend wird Datei für Datei von JavaScript nach TypeScript umgestellt,
statt in einem großen Umbau.

**Warum:** Jede angefasste Datei wird direkt umgestellt; so wächst die Typsicherheit, ohne die
Weiterentwicklung zu blockieren. Typen für die API-Objekte liegen zentral in `types/`.
