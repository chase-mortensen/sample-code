is_connected(X,Y):-door(X,Y).
is_connected(X,Y):-door(Y,X).

show_connections(X):-is_connected(X,Y),name(Y,N),write(N),write('\n'),show_short(Y),write('\n'),fail.
show_connections(_).

show_short(X):-short_desc(X,Y),write(Y),!.
show_short(_).

show_long(X):-long_desc(X,Y),write('\n'),write(Y),!.

look(X):-here(X),name(X,N),write('\n'),write(N),show_long(X),write('\n\n'),show_connections(X),!,fail.
look(_).

show_objects(X):-location(Y,X),here(Y),name(Y,Z),write('\n'),write(Z),write('\n'),show_short(Y),write('\n').
show_objects(_).

study(X):-name(X,N),write('\n'),write(N),show_long(X),write('\n'),show_objects(X),write('\n'),fail.
study(_).

inventory(_):-has(X),name(X,Y),write(Y),write('\n'),fail.
inventory(_).

move(X):-here(Y),is_connected(X,Y),retract(here(_)),assertz(here(X)),look(X).

take(X):-retract(location(X,_)),assertz(has(X)).

make_location(X):-create_recipe([Y|T],X),location(Z,Y),here(Z).

make_ingredients(X):-create_recipe([Y|T],X)

can_make(X):-make_location(X),make_ingredients(X).

make(X):-can_make(X),make_ingredients(X),!.

put(X):-retract(has(X)),assertz(location(X,_)).

bigger_than(large_disk,medium_disk).
bigger_than(medium_disk,small_disk).

valid(D,P):-location(X,P),bigger_than(X,D).
valid(D,P):-location(_,P).

transfer(X,Y):-valid(D,Y),retract(location(X,_)),assertz(location(_,Y)),!.