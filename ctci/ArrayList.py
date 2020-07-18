class ArrayList():
  def __init__(self, init_size=10, resizing_factor=1):
    self.size = init_size
    # the rf must be at least 50% - 
    # I want to avoid situations where a small rf could cause
    # issues by not actually increasing the size of the array
    if (resizing_factor <= 0.5): 
      resizing_factor = 1
    self.rf = resizing_factor
    self.arr = [None] * self.size
    self.cur_index = 0

  def append(self, value):
    self.arr[self.cur_index] = value
    self.cur_index += 1
    print(self.arr)

    if self.cur_index >= self.size:
      print('increasing size by ', self.rf * 100, '%')
      self.size += int(self.size + (self.size * self.rf))
      new_arr = [None] * self.size
      
      for i in range(len(self.arr)):
        new_arr[i] = self.arr[i]
      self.arr = new_arr
      print(self.arr)
      print()

myList = ArrayList(init_size=2, resizing_factor=0.6)
myList.append(1)
myList.append(1)
myList.append(1)
myList.append(1)
myList.append(1)
myList.append(1)
myList.append(1)
myList.append(1)
myList.append(1)
myList.append(1)
