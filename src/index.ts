class AsyncQueue<T> {
  private cache: Record<string, Promise<T>[]> = {}

  async wait(key: string, p: Promise<T>) {
    if (!this.cache[key]) this.cache[key] = []

    const priorityQueue = [...this.cache[key]]

    this.cache[key].push(p)

    await Promise.all(priorityQueue)
    const v = await p

    this.cache[key].splice(this.cache[key].indexOf(p), 1)

    return v
  }
}

export default AsyncQueue
