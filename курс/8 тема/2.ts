type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type arr3 = []

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3

type head3 = First<arr3>

type First<T extends any[]> = T extends [infer First] ? First : never
type First2<T extends any[]> = T[0] extends null | undefined ? never : T[0]