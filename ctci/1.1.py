# isUnique

# using length of set vs string

string1 = ';lkjpoiuyoiuvzx3598709'
string2 = '12340987qwerpoiuzxcvlkjhasdf.,mn'

def isUnique(string):
  if len(string) > 0:
    return len(string) == len(set(string))
  return -1

# w/o additional data structures -> nested for loops

def isUnique2(string):
  if len(string) > 0:
    for i in range(len(string)-1):
      for j in range(i+1, len(string)):
        if string[i] == string[j]:
          return False
    
    return True
  return -1

print(isUnique(string1))
print(isUnique(string2))

print(isUnique2(string1))
print(isUnique2(string2))

print(isUnique(""))
print(isUnique2(""))
