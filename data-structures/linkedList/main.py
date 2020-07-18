# Singly linked list

class Node:
  def __init__(self, data=None, next_node=None):
    self.data = data
    self.next_node = next_node
  
  def get_data(self):
    return self.data
  
  def set_data(self, new_data):
    self.data = new_data
  
  def get_next(self):
    return self.next_node
  
  def set_next(self, new_node):
    self.next_node = new_node
  

class LinkedList:
  def __init__(self, head=None):
    self.head = head
  
  def print_list(self):
    current_node = self.head
    count = 1
    while (current_node):
      print(str(count) + ": " + str(current_node.data))
      current_node = current_node.get_next()
      count += 1

if __name__ == '__main__':

  firstNode = Node(123)
  thirdNode = Node(345)
  secondNode = Node(234, thirdNode)


  myList = LinkedList(firstNode)

  myList.head.set_next(secondNode)

  myList.print_list()
