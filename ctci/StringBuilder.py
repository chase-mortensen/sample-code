
# StringBuilder class
#   joins strings using an array
class StringBuilder():
  def __init__(self, sep=' '):
    self.arr = []
    self.sep = sep

  def append(self, string):
    self.arr.append(string)
    # print(self.arr)
  
  def toString(self):
    return self.sep.join(self.arr)
    


def joinWords(words, sep=' '):
  sentence = StringBuilder(sep)
  for word in words:
    sentence.append(word)
  return sentence.toString()

print(joinWords(['let\'s', 'see', 'if', 'this', 'works']))
print(joinWords(['let\'s', 'see', 'if', 'this', 'works'], '&'))
