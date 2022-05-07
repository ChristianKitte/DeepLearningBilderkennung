![image](https://user-images.githubusercontent.com/32162305/150810942-99672aac-99af-47ea-849b-ba263fae0c3f.png)

---

**Deep Learning**

**Dozent: Prof. Dr. Felix Gers (Berliner Hochschule für Technik)**

**Studiengang Medieninformatik Online MA, Sommersemester 2022**

**University of Applied Sciences Emden/Leer, Faculty of Technology, Department of Electrical Engineering and Informatics**

---

### Einsendeaufgabe EA1 : Erstellung einer Webanwendung zur Klassifizierung von Bildern auf Basis der JavaScript Bibliothek ml5.js.

[zur Webseite](https://deep-learning.ckitte.de/ea1/)

## Umsetzung

Die hier vorgestellte Anwendung ermöglicht die Klassifizierung von Bildern mithilfe eines neuronalen Netzes. Die Lösung basiert auf drei von ml5 angebotene Funktionlität zur Bilderkennung. Als Modell wird hierzu aus den von ml5 angebotenen Netzen MobilNet ausgewählt. Es handelt sich hierbei um ein vortrainiertes Netz, das direkt eingesetzt werden kann. Die Nutzung des Frameworks und die Ausgabe erfolgt in fünf Schritten:

### Schritt 1: Laden des Netzes

Im ersten Schritt wird bei Aufruf und Aufbau der Seite das später genutzte MobilNet mit Hilfe von ml5 geladen. Der Erfolg oder Misserfolg wird textlich auf der Hauptseite angezeigt. Mit dem Laden des Netzes sind alle Vorbereitungen abgeschlossen.

### Schritt 2: Bildauswahl:

Im zweiten Schritt wird das zu klassifizierende Bild ausgewählt. Dies geschieht entweder mithilfe eines Dateidialoges, oder aber per drag and drop. Die zweite Option ermöglicht das einfache Verwenden von Bildern direkt aus dem Internet.

### Schritt 3: Prüfen des Dateiformates:

Nach dem Ablegen eines Bildes erfolgt im dritten Schritt sofort die weitere Verarbeitung. Hierfür wird als erstes anhand der Dateiendung geprüft, ob es sich um gültiges Format handelt. Gültige Formate sind:

- JPEG (*.jpg, *.jpeg)
- Bitmap (*.bmp)
- Portable Network Graphics (*.png)
- WebP Dateien (*.webp)

Bei ungültigen Dateien wird ein Hinweis als Meldung angezeigt und die Verarbeitung abgebrochen.

### Schritt 4: Klassifizierung

Für gültige Dateien wird im DOM der Image Tag des Zielbildes ausgetauscht, und dieser Tag als Parameter der Funktion predictImage zur Klassifizierung übergeben. Hierbei wird der hohe Abstraktionsgrad von ml5 genutzt, der es ermöglicht, neben Bilder auch Verweise zu verwenden. Siehe hierzu die Referenz.

Eine Vorverarbeitung des Bildes ist bei Verwendung von ml5 in der Kombination mit Mobile Net nicht notwendig. Ml5 übernimmt alle Vorverarbeitungen an dem übergebenen Bild. Dies geschieht mit der Intention, den Zugang möglichst einfach zu gestalten.

### Schritt 5: Ausgabe, Visualisierung und Interpretation

Nach Abschluss der Klassifizierung durch ml5 wird der übergebene Callback gotResult aufgerufen. Hierbei werden - wie im Aufruf zuvor festgelegt - nur die fünf wahrscheinlichsten Klassifizierungen zurückgegeben und in einer farblich unterlegten Liste dargestellt. Zudem wird mit Hilfe der Bibliothek Plotly ein Tortendiagramm erstellt.

Jede Klassifizierung hat eine gewisse Wahrscheinlichkeit. Diese wird als Prozent mit ausgegeben. Es muss berücksichtigt werden, dass nur die fünf wahrscheinlichsten Klassifizierungen zurückgegeben werden, deren Wahrscheinlichkeiten in Summe jedoch nicht 100% ergeben.

Eine Möglichkeit für ein visuelles Feedback wäre, die fünf gefundenen Klassen mit der höchsten Wahrscheinlichkeit in ihrer Gesamtheit als 100% zu sehen. Eine Tortendiagramm würde in diesem Fall zeigen, wie stark die fünf Klassen untereinander im Vergleich sind. Dies könnte leicht den falschen Eindruck erwecken, als wenn die Klassifizierung selbst zu 100% sicher sei. Dies wäre aber falsch.

Daher wird eine zusätzliche Gruppe mit anfänglichen 100% gebildet, von der die Werte der fünf wahrscheinlichsten Klassen abgezogen werden. Diese Gruppe bildet die restlichen Möglichkeiten inklusive der praktisch nicht zu klassifizierenden Bilder.

Hierdurch wird durch das Tortendiagramm die zusätzliche Information darüber vermittelt, wie unsicher das Netz bei der Klassifizierung war.
