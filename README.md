## [Programmierung und Design von WebApplications mit HTML5, CSS3 und JavaScript](https://lsf.uni-regensburg.de/qisserver/rds?state=verpublish&status=init&vmfile=no&publishid=148115&moduleCall=webInfo&publishConfFile=webInfo&publishSubDir=veranstaltung) ##

SS2020 

Leitung: Dr. Friedrich Wünsch, Louis Ritzkowski

# Covid #

Enrico Orsino Mayer

### Beschreibung ###

Alarm! Covid 19 ist ausgebrochen! Jetzt geht es darum nicht angesteckt zu werden. Schieß auf alles, was dir zu nahe kommt. Lass dich bloß nicht berühren oder gar anhusten. Pass ja gut auf, denn es wird immer schwieriger. 

### Umsetzung ###

Der Spieler besitzt drei Leben. Wird er von einem Gegner getroffen oder "angehustet", verliert er ein oder mehr Leben. In jeder Runde werden vier Gegner an festen Positionen gespawnt. Es gibt drei Gegnertypen, die im weiteren Spielverlauf mit wachsendem Schwierigkeitsgrad und in unterschiedlichen Kombinationen generiert werden. 

Gegner 1 "Assault": 1 Leben
Gegner 2 "Sniper": 1 Leben, schießt auf Spieler ab bestimmter Reichweite
Gegner 3 "Tank": 3 Leben, zieht dem Spieler Anzahl eigener übriger Leben ab

Sind alle Gegner besiegt, startet die nächste Runde. Für jeden Treffer gibt es einen Punkt. Neue Maps können als Matrizen mit 0 -> keine Wand und 1 -> Wand generiert werden. In jeder neuen Runde wird eine neue Map zufällig ausgewählt.

Alle Game Objects sind von einer eigenen Klasse und werden von der update-Methode in Covid.js mit jeweils einer eigenen checker-Methode überprüft.

### Steuerung (Falls Spiel) ###

W/A/S/D + Zielen mit Mauszeiger, Schießen mit linker Maustaste

### Wichtige Klassen/Dateien ###

Covid.js
Enemy.js
Futur.css

### Designentscheidungen ###

Game: Retro Design (hell- und dunkelgrün)
  Spieler: gefülltes Quadrat mit durchsichtiger Lebensanzeige
  Gegner: gefüllte und nicht gefüllte Kreise
  
 Game Box:
  Neon Grün mit "Blaupausen" Hintergrund
  
