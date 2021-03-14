# Catch-Mind
[![HitCount](http://hits.dwyl.com/eehwan/Catch-Mind.svg)](http://hits.dwyl.com/eehwan/Catch-Mind)
![GitHub last commit](https://img.shields.io/github/last-commit/eehwan/Catch-Mind.svg)

Realtime Drawing Game built with SocketIO, Gulp, NodeJS

[**Website Link** - (It would take a minute to load the page at first) ](https://catch-mind.herokuapp.com/)

<br>

--------------------------------------------

<br>

## Notice
- It need at least two player to play.
- Someone who wants to test this app alone can do it by opening two browsers (**Nomal mode** & **Secret-mode**).

<br>

---------------------------------------------

<br>

## Steps for Play Game

### - Login
- Set your nickname to enter
### - Start Game
- Press <Get Ready!> to start
- If all of players are ready, game would start.(Temporally if more than 2 players are ready, game starts)
### - Game rules
When game starts, each player get the role(painter or guesser)

    Guesser
    - Guesser can see what painter is drawing
	- Say what you guess and you can get 10 points if it's right

    Painter
	- Painter draw a picture of the given word
	- If nobody guess the word in 60 seconds, you lost points.
	- If someone guess the word, he gets 10 points and you also get 5 points.

### - Game End
- Either 60 seconds have passed, or if someone get the right answer within 60 seconds, the game ends.

<br>

------------------------------------------------------------