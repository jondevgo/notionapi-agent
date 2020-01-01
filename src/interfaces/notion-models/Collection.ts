import {
  UUID, Table, Emoji, NotionSecureUrl,
  PublicUrl, NotionRelativePath
} from "./common/util"
import { SemanticString } from "./common/SemanticString"
import { GalleryProperty } from "./CollectionView"

/**
 * Also used in {@link TableProperty}, {@link GalleryProperty}, 
 * {@link Aggregate}, {@link Filter}, {@link Query}, and {@link Sort}.
 * 
 * `title` when {@link ColumnPropertyType} is `title`.
 * 
 * Otherwise, a 4-ASCII-character string. e.g. `%7_Z`.
 */
export type ColumnID = string

export type ColumnPropertyType =
  "title" | "text" | "number" | "select" | "multi_select" | "date"
  | "person" | "file" | "checkbox" | "url" | "email" | "phone_number"
  | "formula" | "relation" | "created_time" | "created_by"
  | "last_edited_time" | "last_edited_by"

export interface CollectionFormat {
  collection_cover_position?: number
  /** TODO: Not sure if {@link TableProperty} is also possible. */
  collection_page_properties?: GalleryProperty[]
}

export type ColumnPropertyOptionColor =
  "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue"
  | "purple" | "pink" | "red"

export interface ColumnPropertyOption {
  id: UUID
  color: ColumnPropertyOptionColor
  value: string
}

export interface ColumnProperty {
  name: string
  options?: ColumnPropertyOption[]
  type: ColumnPropertyType
  /** Related collection. Defined if `type` = `relation`. */
  collection_id?: UUID
  /** Related column in the collection. Defined if `type` = `relation`. */
  property?: ColumnID
}

export type CollectionSchema = {
  [key in ColumnID]: ColumnProperty
}

export interface Collection {
  id: UUID
  /** `name[0][0]` is the collection's name. */
  name: [[string]]
  icon?: Emoji | NotionSecureUrl | PublicUrl
  cover?: NotionRelativePath | NotionSecureUrl | PublicUrl
  description?: SemanticString[]
  format?: CollectionFormat
  parent_id: UUID
  parent_table: Table
  schema: CollectionSchema
  version: number
  alive: boolean
}