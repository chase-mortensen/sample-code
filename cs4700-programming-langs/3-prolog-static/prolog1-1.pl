is_connected(X,Y):-door(X,Y).
is_connected(X,Y):-door(Y,X).

show_connections(X):-is_connected(X,Y),name(Y,N),write(N),write('\n'),show_short(Y),write('\n'),fail.
show_connections(_).

show_short(X):-short_desc(X,Y),write(Y),!.

show_long(X):-long_desc(X,Y),write('\n\n'),write(Y).

look(X):-name(X,N),write('\n'),write(N),show_long(X),write('\n\n'),show_connections(X),!,fail.
look(_).

show_objects(X):-location(Y,X),name(Y,Z),write('\n'),write(Z),write('\n'),show_short(Y),write('\n'),fail.
show_objects(_).

study(X):-name(X,N),write('\n'),write(N),show_long(X),write('\n\n'),show_objects(X),write('\n'),fail.
study(_).



