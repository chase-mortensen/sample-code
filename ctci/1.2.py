def checkPermutation(s1, s2):
  l1 = list(s1)
  l2 = list(s2)
  l1.sort()
  l2.sort()
  return l1 == l2

print(checkPermutation('saturday', 'daysatura'))
print(checkPermutation('saturday', 'daysatur'))
print(checkPermutation('', ''))
