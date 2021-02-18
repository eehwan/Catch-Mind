# Catch-Mind
Realtime Drawing Game built with SocketIO, Gulp, NodeJS

https://catch-mind.herokuapp.com/

(It would take a minute to load the page at first)

--------------------------------------------

## -- Steps -- 
### Login
- Set your nickname to enter
### Start Game
- Press <Get Ready!> to start
- If all of players are ready, game would start.(Temporally if more than 2 players are ready, game starts)
### Game rules
When game starts, each player get the role(painter or guesser)

    Guesser
    - Guesser can see what painter is drawing
	- Say what you guess and you can get 10 points if it's right

    Painter
	- Painter draw a picture of the given word
	- If nobody guess the word in 60 seconds, you lost points.
	- If someone guess the word, he gets 10 points and you also get 5 points.

### Game End
- Either 60 seconds have passed, or if someone get the right answer within 60 seconds, the game ends.

----------------------------------------------------------------------------
## Notice
- Someone who wants to test this app can do it by opening two browsers (nomal browser & secret-mode)!
