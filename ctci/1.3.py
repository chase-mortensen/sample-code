def URLify(s, length=0):
  if length == 0:
    length = len(s)
  s = s.split()
  result = '%20'.join(s)
  print(result)
  return result

URLify('test string hee hee')
