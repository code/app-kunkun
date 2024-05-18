use serde_derive::Deserialize;
use serde_derive::Serialize;
use serde_json::Value;
use std::path::PathBuf;

pub const MANIFEST_FILE_NAME: &str = "jarvis.ext.json";

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct JarvisExtManifest {
    pub name: String,
    pub version: String,
    pub description: String,
    pub identifier: String,
    pub demo_images: Vec<Value>,
    pub ui_cmds: Vec<UiCmd>,
    pub inline_cmds: Vec<InlineCmd>,
}

impl JarvisExtManifest {
    pub fn load(manifest_path: PathBuf) -> Self {
        let manifest_str = std::fs::read_to_string(manifest_path).unwrap();
        serde_json::from_str(&manifest_str).unwrap()
    }
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UiCmd {
    pub main: String,
    pub name: String,
    pub dev_main: String,
    pub cmds: Vec<Cmd>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Cmd {
    #[serde(rename = "type")]
    pub type_field: String,
    pub value: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct InlineCmd {
    pub main: String,
    pub name: String,
    pub cmds: Vec<Cmd>,
}

// generate test
#[cfg(test)]
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_load_extension_manifest() {
        let manifest_paths = vec![
            "../../../packages/extensions/qrcode/jarvis.ext.json",
            "../../../packages/extensions/myip/jarvis.ext.json",
            "../../../packages/extensions/vscode-project-manager/jarvis.ext.json",
        ];
        for manifest_path in manifest_paths {
            let manifest_str = std::fs::read_to_string(manifest_path).unwrap();
            let _: JarvisExtManifest = serde_json::from_str(&manifest_str).unwrap();
        }
    }
}
