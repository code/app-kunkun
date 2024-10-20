import {
	array,
	boolean,
	date,
	enum_,
	hexColor,
	literal,
	nullable,
	number,
	object,
	optional,
	pipe,
	string,
	union,
	type InferOutput
} from "valibot"
import { NodeName, NodeNameEnum } from "../../../models/constants"
import { Icon } from "../../../models/icon"
import { Color } from "../../../models/styles"
import * as ActionSchema from "./action"
import { Markdown } from "./markdown"

/* -------------------------------------------------------------------------- */
/*                                 Empty View                                 */
/* -------------------------------------------------------------------------- */
export const EmptyView = object({
	nodeName: NodeName,
	title: optional(string()),
	description: optional(string()),
	icon: optional(Icon)
})
export type EmptyView = InferOutput<typeof EmptyView>

/* -------------------------------------------------------------------------- */
/*                                  Dropdown                                  */
/* -------------------------------------------------------------------------- */
export const DropdownItem = object({
	nodeName: NodeName,
	title: string(),
	value: string(),
	icon: optional(Icon),
	keywords: optional(array(string()))
})
export const DropdownSection = object({
	nodeName: NodeName,
	title: string(),
	items: array(DropdownItem)
})
export const Dropdown = object({
	nodeName: NodeName,
	tooltip: string(),
	sections: array(DropdownSection),
	defaultValue: string()
})
export type DropdownItem = InferOutput<typeof DropdownItem>
export type DropdownSection = InferOutput<typeof DropdownSection>
export type Dropdown = InferOutput<typeof Dropdown>

/* -------------------------------------------------------------------------- */
/*                                    List                                    */
/* -------------------------------------------------------------------------- */
export const ItemAccessory = object({
	nodeName: NodeName,
	tag: optional(
		union([
			string(),
			object({
				color: Color,
				text: string()
			})
		])
	),
	text: optional(union([string(), object({ color: Color, text: string() })])),
	date: optional(union([date(), object({ color: Color, text: date() })])),
	icon: optional(Icon),
	tooltip: optional(string())
})
export type ItemAccessory = InferOutput<typeof ItemAccessory>

export const ItemDetailMetadataLabel = object({
	nodeName: NodeName,
	title: string(),
	icon: optional(Icon),
	text: optional(
		union([
			string(),
			object({
				color: Color,
				text: string()
			})
		])
	)
})
export type ItemDetailMetadataLabel = InferOutput<typeof ItemDetailMetadataLabel>

export const ItemDetailMetadataLink = object({
	nodeName: NodeName,
	title: string(),
	text: string(),
	url: string()
})
export type ItemDetailMetadataLink = InferOutput<typeof ItemDetailMetadataLink>

export const ItemDetailMetadataTagListItem = object({
	nodeName: NodeName,
	text: optional(string()),
	color: optional(Color),
	icon: optional(Icon)
})
export type ItemDetailMetadataTagListItem = InferOutput<typeof ItemDetailMetadataTagListItem>

export const ItemDetailMetadataTagList = object({
	nodeName: NodeName,
	title: string(),
	tags: array(ItemDetailMetadataTagListItem)
})
export type ItemDetailMetadataTagList = InferOutput<typeof ItemDetailMetadataTagList>

export const ItemDetailMetadataSeparator = object({
	nodeName: NodeName
})
export type ItemDetailMetadataSeparator = InferOutput<typeof ItemDetailMetadataSeparator>

export const ItemDetailMetadata = object({
	nodeName: NodeName,
	items: array(
		union([
			ItemDetailMetadataLabel,
			ItemDetailMetadataLink,
			ItemDetailMetadataTagList,
			ItemDetailMetadataSeparator
		])
	)
})
export type ItemDetailMetadata = InferOutput<typeof ItemDetailMetadata>

export const ItemDetail = object({
	nodeName: NodeName,
	children: array(union([Markdown, ItemDetailMetadata])),
	width: optional(number())
})
export type ItemDetail = InferOutput<typeof ItemDetail>

export const Item = object({
	nodeName: NodeName,
	title: string(),
	subTitle: optional(string()),
	accessories: optional(array(ItemAccessory)),
	value: string(),
	defaultAction: optional(string()),
	actions: optional(ActionSchema.ActionPanel),
	icon: optional(Icon),
	keywords: optional(array(string()))
	// id: optional(string('')),
})
export type Item = InferOutput<typeof Item>

export const Section = object({
	nodeName: NodeName,
	title: optional(string()),
	subtitle: optional(string()),
	items: array(Item)
})
export type Section = InferOutput<typeof Section>

export const ListInheritOptions = union([
	literal("items"),
	literal("detail"),
	literal("filter"),
	literal("sections"),
	literal("actions"),
	literal("defaultAction")
])
export type ListInheritOptions = InferOutput<typeof ListInheritOptions>
export const List = object({
	nodeName: NodeName,
	sections: optional(array(Section)),
	items: optional(array(Item)),
	filter: union([literal("none"), literal("default")]),
	detail: optional(ItemDetail),
	actions: optional(ActionSchema.ActionPanel),
	defaultAction: optional(string()),
	inherits: optional(array(ListInheritOptions))
})
// export type List = InferOutput<typeof List>
/**
 * Manually define type of List to avoid TypeScript error
 * `Type instantiation is excessively deep and possibly infinite.`
 * This happens when this type is used in another package.
 * This doesn't seem to happen when this package is published as TypeScript,
 * but only when it's packaged and published as JavaScript.
 */
export type List = {
	nodeName: NodeName
	sections?: Section[]
	items?: Item[]
	filter: "none" | "default"
	detail?: ItemDetail
	actions?: ActionSchema.ActionPanel
	defaultAction?: string
	inherits?: ListInheritOptions[]
}
