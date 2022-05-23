export class GameEventsManager {

  private listeners: Map<string, Array<any>>;

  constructor() {
    this.listeners = new Map<string, Array<any>>();
    this.listeners.set('hide', [])
    this.listeners.set('seek', [])
  }

  public subscribe(event: string, listener: any) {
    this.listeners.get(event).push(listener);
  }

  public unsubscribe(event: string, listener: any) {
    const stuff = this.listeners.get(event).filter((item) => item !== listener);
    this.listeners.set(event, stuff) 
  }

  public notify(event: string, data: any) {
    this.listeners.get(event).map((item) => item.update(data));
  }
}
