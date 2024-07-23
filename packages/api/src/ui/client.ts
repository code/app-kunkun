import { toast } from "vue-sonner"
import { type JarvisExtDB } from "../commands/db"
import { type AppInfo } from "../models/apps"
import { type IComponent } from "./worker/components/interfaces"
import * as ListSchema from "./worker/schema/list"

type PromiseWrap<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>

export interface ISystem {
  openTrash(): Promise<void>
  emptyTrash(): Promise<void>
  shutdown(): Promise<void>
  reboot(): Promise<void>
  sleep(): Promise<void>
  toggleSystemAppearance(): Promise<void>
  showDesktop(): Promise<void>
  quitAllApps(): Promise<void>
  sleepDisplays(): Promise<void>
  setVolume(percentage: number): Promise<void>
  setVolumeTo0(): Promise<void>
  setVolumeTo25(): Promise<void>
  setVolumeTo50(): Promise<void>
  setVolumeTo75(): Promise<void>
  setVolumeTo100(): Promise<void>
  turnVolumeUp(): Promise<void>
  turnVolumeDown(): Promise<void>
  toggleStageManager(): Promise<void>
  toggleBluetooth(): Promise<void>
  toggleHiddenFiles(): Promise<void>
  ejectAllDisks(): Promise<void>
  logoutUser(): Promise<void>
  toggleMute(): Promise<void>
  mute(): Promise<void>
  unmute(): Promise<void>
  getFrontmostApp(): Promise<AppInfo>
  hideAllAppsExceptFrontmost(): Promise<void>
  getSelectedFilesInFileExplorer(): Promise<string[]>
}

export interface IToast {
  message: PromiseWrap<typeof toast.message>
  info: PromiseWrap<typeof toast.info>
  success: PromiseWrap<typeof toast.success>
  warning: PromiseWrap<typeof toast.warning>
  error: PromiseWrap<typeof toast.error>
}

export interface IUiWorker {
  render: (view: IComponent<ListSchema.List>) => Promise<void>
  setScrollLoading: (loading: boolean) => Promise<void>
  setSearchTerm: (term: string) => Promise<void>
  setSearchBarPlaceholder: (placeholder: string) => Promise<void>
}

export interface IUiIframe {
  goHome: () => Promise<void>
  goBack: () => Promise<void>
}

export interface IDb {
  add: typeof JarvisExtDB.prototype.add
  delete: typeof JarvisExtDB.prototype.delete
  search: typeof JarvisExtDB.prototype.search
  retrieveAll: typeof JarvisExtDB.prototype.retrieveAll
  retrieveAllByType: typeof JarvisExtDB.prototype.retrieveAllByType
  deleteAll: typeof JarvisExtDB.prototype.deleteAll
  update: typeof JarvisExtDB.prototype.update
}
