import AsyncQueue from '..'

const asyncTimeout = <T>(timeout: number, value: T) =>
  new Promise<T>(resolve => setTimeout(() => resolve(value), timeout))

describe('AsyncQueue', () => {
  test('should return in order', () => {
    const queue = new AsyncQueue()
    const result: number[] = []

    const wait = (p: Promise<any>) => queue.wait('asyncTimeout', p)

    wait(asyncTimeout(20, 1)).then(() => result.push(1))
    wait(asyncTimeout(10, 2)).then(() => result.push(2))
    wait(asyncTimeout(30, 3)).then(() => result.push(3))
    wait(asyncTimeout(10, 4)).then(() => result.push(4))

    return asyncTimeout(50, 0).then(() => expect(result).toMatchObject([1, 2, 3, 4]))
  })
})
