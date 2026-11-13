# Code-Auszüge

Ausgewählte Dateien aus dem privaten Repository der ASZ Management Suite, unverändert übernommen.
Sie zeigen Code-Stil und Lösungsansätze, ergeben zusammen aber **keine lauffähige Anwendung**.
Lizenz siehe [LICENSE](../LICENSE).

| Datei | Was sie zeigt |
| ----- | ------------- |
| [backend/bierwart/BwAccountSnapshotService.java](backend/bierwart/BwAccountSnapshotService.java) | Kassenstände: neuer Stand auf Basis des letzten, genau ein Topf (Konto, Kasse, Inventar) wird verändert, Kommentar als Begründung |
| [backend/bierwart/BwBookingService.java](backend/bierwart/BwBookingService.java) | Getränkebuchung: Mitgliedskonto belasten, Bestand reduzieren; Ändern und Löschen als Rück- und Neubuchung |
| [backend/bierwart/BwDepositService.java](backend/bierwart/BwDepositService.java) | Einzahlungen mit Korrektur- und Rückbuchungen über die Differenz |
| [backend/bierwart/InventoryService.java](backend/bierwart/InventoryService.java) | Inventur starten (Sollbestand einfrieren) und automatisch abschließen, sobald alles gezählt ist |
| [backend/bierwart/InventoryEntryService.java](backend/bierwart/InventoryEntryService.java) | Schwund und Schwundwert pro gezähltem Getränk |
| [backend/reports/BookingsReportService.java](backend/reports/BookingsReportService.java) | Bierliste als PDF mit OpenPDF: Aggregation pro Mitglied und Getränk, farbige Kontostände |
| [backend/reports/BwReportController.java](backend/reports/BwReportController.java) | PDF-Endpunkte mit Datumsparametern, Auslieferung als `application/pdf` |
| [backend/member/Member.java](backend/member/Member.java) | JPA-Entity mit eingebetteter Adresse, Enum-Status und Beziehungen zu Ämtern, Abschlüssen und Familienlinie |
| [backend/enums/Status.java](backend/enums/Status.java), [EnumController.java](backend/enums/EnumController.java) | Enums mit deutschen Anzeigenamen, per Endpunkt an das Frontend geliefert |
| [backend/config/CorsConfig.java](backend/config/CorsConfig.java) | Erlaubte Origins aus der Konfiguration (Umgebungsvariable) |
| [backend/resources/logback-spring.xml](backend/resources/logback-spring.xml) | Logging auf Konsole und in rotierende, komprimierte Dateien mit Größenlimit |
| [frontend/BookingsPage.tsx](frontend/BookingsPage.tsx) | Tabellenseite: Suche, sortierbare Spalten, Zeitraum für den PDF-Bericht, Dialog zum Anlegen/Bearbeiten |
| [frontend/BwBookingAddEdit.tsx](frontend/BwBookingAddEdit.tsx) | Dialog für mehrere Getränke auf einmal, neue Zeile erscheint automatisch |
| [frontend/InventoryEdit.tsx](frontend/InventoryEdit.tsx) | Zählen der Inventur mit Zwischenstand |
| [frontend/sortUtils.tsx](frontend/sortUtils.tsx) | Generische, typisierte Sortierfunktion (numerisch bzw. deutsche Textsortierung) |
| [frontend/crudUtils.jsx](frontend/crudUtils.jsx) | Gemeinsames Speichern (POST/PUT anhand der ID) und Löschen |
| [frontend/SideBar.jsx](frontend/SideBar.jsx) | Navigation mit aufklappbarem Bierwart-Menü |
| [infra/Dockerfile.backend](infra/Dockerfile.backend), [infra/Dockerfile.frontend](infra/Dockerfile.frontend) | Multi-Stage-Builds, Lizenzprüfung im Build, Nicht-Root-Backend |
| [infra/nginx.conf](infra/nginx.conf) | Auslieferung der SPA und Reverse Proxy für die API |
