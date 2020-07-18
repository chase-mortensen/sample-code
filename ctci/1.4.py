# this function determines if a permutation of a given string
# could be palindromic
def palindromePermutation(p):
  p = p.replace(' ', '')
  letters = {}
  for l in set(p):
    letters[l] = 0
  for l in p:
    letters[l] += 1
  
  # palindromes can only have up to one letter that has an odd count
  #   I'll loop through the letters and count up the odd counts
  #   if the count is greater than 1, it cannot be a palindrome permutation

  odd_count = 0
  for key in letters.keys():
    if letters[key] % 2:
      odd_count += 1
  
  return odd_count < 2


print(palindromePermutation('tact coa'))
print(palindromePermutation('carerca'))
print(palindromePermutation('asdfasdfasdfasdfqwerqwerqwerqwer'))
print(palindromePermutation('asdfqwerasdfqwerasdfqwerasdf'))
