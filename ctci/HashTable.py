from collections import deque

# My own implementation as an exercise
#   dictionary is better
class HashTable():
  def __init__(self, size=1000):
    self.arr = [None] * size
    self.size = size
  
  def insert(self, key, value):
    loc = hash(key) % self.size
    if (self.arr[loc] == None):
      self.arr[loc] = deque([{key: value}])
    else:
      self.arr[loc].append({key: value})

  def retrieve(self, key):
    loc = hash(key) % self.size
    
    if self.arr[loc] != None:
      for pair in self.arr[loc]:
        if key in pair.keys():
          return pair[key]
    return -1    

test = HashTable(size=5)
test.insert('a', '1')
test.insert('b', '2')
test.insert('aa', '3')

print(test.retrieve('a'))
print(test.retrieve('aa'))
print(test.retrieve('c'))
