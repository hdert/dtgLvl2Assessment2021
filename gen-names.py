from typing import List

i = [
    "",
    "",
]
while i[-1] != ' ' and i[-2] != ' ':
    i.append(input())
print(i)
i.pop(0)
i.pop(0)
z = []  # type: List[str]
y = []
print(i)
for x in i:
    if x in ('', ' '):
        y.append(z)
        print(z)
        z = []
    else:
        z.append(x)
print(y)
