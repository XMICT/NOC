interface CheckServiceUseCase {
  execute: (url: string) => Promise<boolean>
}

type SucccesCallback = () => void
type ErrorCallback = (error: string) => void

// Notificara el estado de un url
export class CheckService implements CheckServiceUseCase {

  // Dependency Injection
  constructor(
    private readonly succesCallback: SucccesCallback,
    private readonly errorCallback: ErrorCallback
  ) {

  }

  public async execute(url: string): Promise<boolean> {
    try {
      const respone = await fetch(url)

      if (!respone.ok) throw new Error(`${url} url is not available`)
      this.succesCallback()
      return true

    } catch (error) {
      this.errorCallback(`${error}`)
      return false
    }
  }
}