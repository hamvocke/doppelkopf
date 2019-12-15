# Learn to play
Hey there! It's about time for you to learn one of the best card games there is. We will get you to understand _Doppelkopf_ in no time with this guide. Whenever you feel like it, you can jump out of this guide and play against a computer over at [https://doppelkopf.ham.codes]().

Be aware, Doppelkopf is a complex game and seeing all the rules at once can seem overwhelming. This guide will introduce you to the basics one step at a time and leave out more complicated things for later. This should be enough to get you playing in no time. From there you can practice and come back to learn more advanced topics later on.

Let's get started!


## The goal
Doppelkopf is a _"trick-taking"_ game. It's usually played by _four players_. In a trick-taking game, you play multiple rounds. In each round, every player plays one card. Whoever played the highest card wins the trick of the current round. Whoever has the most points at the end of the game wins. So winning a lot of tricks might be a good tactic to win.

**TODO image of a trick goes here**


## The deck
Doppelkopf is played with a special deck of cards. A Doppelkopf deck usually consists of 48 cards (40 cards if you decide to play a little faster, more on that later).

You take either French- (♣ ♠ ♥ ♦) or German-suited (**TODO**) cards. We will take a French-suited deck for the rest of this guide.

The deck consists of two of the following cards for each suit:

  * 9 †
  * 10
  * Jack
  * Queen
  * King
  * Ace

**TODO: images of these cards?**

†: nines can be left out of the deck if you like it a bit more fast-paced

This means that in a Doppelkopf deck, _each card exists twice_. 

**TODO: use icons below to indicate cards?**
You'll have two queens of clubs, two aces of diamonds, two tens of hearts, and so on. If you've been wondering, this is where the name _Doppelkopf_ (_double head_ in English) comes from.


## Trumps & non-trumps
There are two groups of cards in Doppelkopf. _Trumps_ and _non-trumps_.

All cards in the game are in a certain order. To win a trick, you need to play the highest card in that given trick. It's as simple as that.

All trumps are higher than non-trumps. They can be used to trump other cards. So, playing a high trump makes it more likely that you win the current trick. However, playing a trump is not the only way to win a trick - more on that later.

**Trump** cards are all of the following:
    * all cards of the diamond suit (♦)
    * all queens
    * all jacks
    * the ten of hearts

Therefore, **non-trump** cards are all other cards.

To give you an overview, these are all *trump* cards, ordered from high to low:

**TODO: list trumps here**

And these are all *non-trump* cards, _roughly_ ordered from high to low:

**TODO: list non-trumps here**
**TODO: implement a quiz - trump or non-trump - here?**

## Card order
Card order matters when it comes to finding out who is winning a trick. If you want to win a trick, you need to play the highest card in that trick. Let's see how we can find out which card is higher and which one is lower.

All cards in a Doppelkopf deck have a certain rank. Cards with a higher rank beat cards with a lower rank. In order to beat a card played by another player, you have to play a card with a _higher_ rank. Playing a card with the same rank doesn't beat the card that was played first (remember, every card exists twice in a Doppelkopf deck).

There are a few rules of thumb to keep in mind to determine the rank of a card †:
    * _all_ trumps are higher than _all_ non-trumps
    * the ten of hearts is the highest card in the game. It beats _all_ other cards (except for another ten of hearts, of course).
    * queens are higher than jacks
    * within queens and jacks, the order goes clubs, spades, hearts, diamonds (high to low). A queen of spades beats a queen of hearts
    * for all other cards (the remaining trumps and all non-trumps) the order goes ace, ten, king, nine

Wow, that's a lot, isn't it? Learning the card order is probably the most tricky part of the game and the list of things to check is pretty complex indeed. Don't worry about it, with more experience you will get a good feeling for the order of the cards. Before starting a game, it is a good idea to sort all cards on your hand by rank, from high to low. Take your time as this will make playing a little easier. If you're playing with a real card game, you will often see a small card with the order of cards in a Doppelkopf game printed to it. Alternatively, you can take a look at this [handy cheat sheet](**todo: link here**) we've created for you.

When [playing on this site](https://doppelkopf.ham.codes) you don't have to worry too much about keeping the order in mind perfectly. The game will automatically sort the cards on your hand from high to low for you. After a few games you will have a better feeling for the order, don't worry!

†: These rules only apply to a regular game. If you're playing a _Solo_, the order changes slightly - don't worry about that at this point.

**TODO: cheat sheet**
**TODO: show canonical card order**
**TODO: implement a quiz - which card is higher - here?**

## Playing a card
Now that you know about the card order, you've already understood the most important thing about Doppelkopf. The next big thing is to understand when you are allowed to play a certain card.

That's right, Doppelkopf has some rules in place that restrict which cards you can play in a given trick. Don't worry, these rules are not too complex and once more, when you're [playing online](https://doppelkopf.ham.codes), the game will automatically prevent you from playing cards you're not allowed to play.

The restrictions of what you can play are quite simple:

    1. If you're opening a trick (i.e. you play the first card) you can play _any card_ on your hand
    2. If someone else opened the trick, you have to _follow suit_
    3. If you can't follow suit, you can play _any card_ on your hand

Let's take a closer look at this.

The first point should be clear. Just play whatever you feel like when opening a trick. You'll learn the tactics of what's a good opening card soon enough.

If you're not opening the trick, you need to check if you have to _follow suit_. Following suit means that you take a look at the _first_ card that has been played in this trick (the one that opened the trick). Now you look at the cards on your hand and see if there is a card of the same suit. This means:

    1. If the first card in the trick was a trump, and you've got a trump on your hand
    2. If the first card in the trick was a non-trump, and you've got a non-trump of the same suit

...then you have to follow suit by playing the card in question. If you can't follow suit because you don't have a trump when trump has been played or you don't have a non-trump of the same suit, then you're free to play whatever card you want to.

Let's look at an example:

    1. The trick has been opened with a _queen of spades_.
    2. You've got a _king of diamonds_ and an _ace of spades_ left on your hand
    3. Since the trick has been opened with a trump, you need to play a trump, too, if you can
    4. the _ace of spades_ has the same suit (both are spades) but it isn't a trump
    5. the _king of diamonds_ is a trump, same as the opening card
    6. this means you _have to_ play the king of diamonds to follow suit

Another example, this time the trick is opened with a non-trump:

    1. The trick has been opened with an _ace of clubs_
    2. You've got a _queen of clubs_ and a _ten of clubs_ on your hand
    3. Since the trick has been opened with a non-trump, you need to play a non-trump of the same suit, if you can
    4. The _queen of clubs_ has the same suit, but it's a trump (remember, all queens are trumps)
    5. The _ten of clubs_ is a non-trump and has the same suit
    6. This means you _have to_ play the _ten of clubs_ to follow suit

One more example, then I'll let you go!

    1. The trick has been opened with an _ace of hearts_
    2. You've got a _queen of diamonds_ and an _ace of spades_ on your hand
    3. Since the trick has been opened with a non-trump, you need to play a non-trump of the same suit, if you can.
    4. The _ace of spades_ is a non-trump, but it's of a different suit
    5. That means you can't follow suit, so you're free to play either card

If you can, you have to follow suit. If you don't have a card of the played suit on your hand, you're good to play whatever card you want to play (trumping could be a clever move now).

If you play in real-life, playing a card you're not allowed to play means you lose the game right on the spot. Players with a little experience will be able to call you out, so don't even try to cheat. If you play a wrong card by mistake, your co-players will usually treat this as a rookie mistake, so don't sweat it!


## Taking a trick
To take a trick, you have to play the card with the highest rank in this trick. It's as easy as that. As you've seen before, the cards you're allowed to play can be limited, this is what makes Doppelkopf interesting and loaded with strategy.

Remember that each card exists twice in this game. If there are both of the same card in a single trick, the one that has been played first is considered higher than the one that has been played second. So, in order to beat a card, you have to play another card with a _higher_ rank, not with the _same_ or a _lower_ rank.

In this trick, the queen of hearts takes trick:

    * king of diamonds
    * jack of clubs
    * queen of hearts
    * ace of diamonds


## Parties
Do you like parties? Of course you do!

Easily the most interesting bit of playing Doppelkopf is the fact that you're never playing alone. That's right, in every game of Doppelkopf, you're secretly playing with a partner. Who that partner is can remain a mystery throughout the majority of the game or can be pretty clear from the beginning. Sounds intriguing? It is.

In every game of Doppelkopf, you have two parties: _Re_ and _Kontra_.

Usually, each party is made up of two players (this is different in _solo_ games, but let's forget about that for now). Two players of a party play together. That means, once the game is over, the points of the _Re_ players and the points of the _Kontra_ players will combined. The players of each party win or lose together.

There's a simple rule that determines whether you're in the _Re_ or _Kontra_ party:

If you've got the _queen of clubs_ on your hand, you're _Re_. 
If not, you're _Kontra_.

Simple as that.

And since every card exists twice in this game, there will be two _queens of clubs_ usually resulting in two players in the _Re_ and two in the _Kontra_ party.

There is a chance that you end up with two _queens of clubs_ on your own hand. This is a special scenario (Doppelkopf is full of special scenarios and exceptions!) called a _wedding_, and we'll take a look at that one later.

Most games should end up with two separate players having one _queen of clubs_ each. Let's take a look at this constellation only for now.

Now that you know which party you belong to, here's the interesting bit: You're not allowed to tell anyone which party you belong to. That is except for a few special cases (oh those lovely exceptions!):

    1. By playing the _queen of clubs_ you can signal to all other players that you're in the _Re_ party. You don't know who you'll be playing with this way, but others will know a bit more.
    2. At the beginning of the game, you're allowed to make certain announcements - all within specific rules. More on that later, but for now it's good to know that at the very beginning of the game, you're allowed to announce if you belong to the _Re_ or _Kontra_ party. But beware, announcing this comes with certain consequences.

Playing with parties allows for interesting tactics to emerge. Once you know who you're playing with, you can start playing collaboratively. If you know that your co-player is sure to win the current trick, you can play a card that's worth a lot of points, for example.


## Winning the game
The game ends once all players have played all their cards.

The party who gets more than _120 points_ wins the game.

In Doppelkopf, each card is assigned a value:

    * Ace is worth 11 points
    * 10 is worth 10 points
    * King is worth 4 points
    * Queen is worth 3 points
    * Jack is worth 2 points
    * 9 is worth nothing

An entire deck of cards has 240 points. Thus, getting more than 120 points will let you win the game.

The points of all players in a party are combined. _Re_ and _Kontra_ win and lose as a party, not as individual players.

If both parties should end up with exactly 120 points, _Kontra_ will win - since they start with the disadvantage of not having the two powerful _queens of clubs_.

Once the game is over, both parties count their points and figure out if they won or lost. Now it's time to figure out the score for this game.


## Scoring
Each game of Doppelkopf has a certain score that can be figured out after the tricks won have been counted by each party.

Once a game is over, each party calculates and notes down their score. Each player of a party gets the same score for the game.

Each of the following add _1 point_ to the score of your party. Note that both parties can get points and you only note the difference of the two parties' scores.

    * winning the game
    * winning as the _Kontra_ party ("against the elders")
    * announcing _Re_ or _Kontra_
    * the losing team has less than 90 points (_no 90_)
    * announcing _no 90_
    * the losing team has less than 60 points (_no 60_)
    * announcing _no 60_
    * the losing team has less than 30 points (_no 30_)
    * announcing _no 30_
    * the losing team has no points at all (_schwarz_)
    * announcing _schwarz_
    * getting an extra (_catching a fox_, _Doppelkopf_ and others) (**TODO: link**)

_Example_: Alice and Bob (_Kontra_) won against Carol and Dave (_Re_). Alice and Bob got 161 points by winning a lot of tricks. That means, Carol and Dave got 79 points. Neither _Re_ or _Kontra_ caught a fox or got any other extra in this game.

The _Kontra_ players will get _+3 points_ for this game:

    1. one for winning
    2. one for winning against _Re_
    3. one because the other party didn't get _90 points_ (_no 90_).

The players write down the following points after this game:

    * Alice: +2
    * Bob: +2
    * Carol: 0
    * Dave: 0

## Extras

As hinted earlier, you can get extra scores during a game, outside of simply winning the game. These are optional rules you _can_ but don't _have to_ apply to your game. Feel free to add or leave them out as you like. But be sure to discuss this before your game, so everyone is aware.


### Fuchs (Fox)
The _ace of diamonds_ is called _Fox_ (Fuchs) in Doppelkopf. Being an ace, it's quite valuable as it's worth 11 points. But there's an even more interesting aspect to it:

If you take a trick that contains the _Fox_ of the opposing party, your party gets an extra point at the end of the game, no matter if you win or lose the game.

So if you're _Re_ and you win a trick that contains a _Fox_ of the _Kontra_ party, you get an extra point at the end of the game. If you win a trick with your own _Fox_, no one gets an extra point.

### Charly
The _jack of clubs_ is called _Charly_ (Karlchen) in Doppelkopf.

If you manage to _win_ the last trick with a _Charly_, your party gets an extra point, no matter if you win or lose the entire game. Note, that Charly has to be the card that's actually winning the last trick. If there's a card higher than Charly in the last trick, this doesn't count as an extra point.


### Doppelkopf
A trick that has a value of 40 or more is called a _Doppelkopf_.

If you manage to win a _Doppelkopf_ trick, your party gets an extra point, no matter if you win or lose the entire game.

Effectively a _Doppelkopf_ has to consist of 10s and aces exclusively to get to 40 points or more.

### Schweinchen

## Additional, optional rules
Doppelkopf has a lot of optional rules you can add or leave out. Some people like to spice things up by adding certain rules. If you're just starting out, it might be better to keep it simple for the beginning.

Whenever you start playing with a new group of people, make sure to discuss which rules you're going to play with before you start playing. Here are some possible rules you can add to your game:

### scharfer Doppelkopf
Some people like their games a little more fast-paced. If you're one of them, you can decide to play the game without 9s entirely. That means you simply take all 9s out of the deck and play without them.

9s don't have any value so they don't add anything to your final points or the sum of points in the game. You still win with more than 120 points, as before. The only difference is that each player gets one card less and the game consists of one less round. Everything else remains the same.


### Fox caught
See [fox caught](**todo ref**). If you add this rule to your game, catching the fox (_ace of diamonds_) of the opposing party will get you an extra point.

### Charly (Karlchen)
See [Charly](**todo ref**). If you add this rule to your game, winning the last trick with a _jack of clubs_ will get you an extra point.

### zweite Dulle
* Schweinchen


## Announcements

## Playing Solo

### Bubensolo
### Damensolo
### stille Hochzeit
### Fleischlos

## Special plays
### Hochzeit
### Armut

## Strategy
