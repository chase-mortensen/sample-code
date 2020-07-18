class Person():
  def __init__(self, name, age):
    self.name = name
    self.age = age
  
  def printDetails(self):
    self.i = 0
    # print(self.name, 'is', self.age, 'years old')

  def hadBirthday(self):
    self.age += 1
    # print('Happy Birthday,', self.name)

  def getAge(self):
    return self.age

  def getName(self):
    return self.name

  def getAgeDouble(self):
    return self.age * 2


p1 = Person('Dylan', 17)

# p1.printDetails()
# p1.hadBirthday()
# print(p1.printDetails())
print(p1.getAge() + p1.getAge())


