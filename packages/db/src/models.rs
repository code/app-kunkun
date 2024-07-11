use rusqlite::types::FromSql;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Ext {
    pub ext_id: i32,
    pub identifier: String,
    pub version: String,
    pub enabled: bool,
    pub installed_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ExtData {
    pub data_id: i32,
    pub ext_id: i32,
    pub data_type: String,
    pub data: String,
    pub search_text: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum CmdType {
    Iframe,
    Worker,
    QuickLink,
}

impl CmdType {
    pub fn to_string(&self) -> String {
        serde_json::to_string(self)
            .map(|s| s.trim_matches('"').to_string())
            .unwrap_or_else(|_| String::from(""))
    }
}

impl FromSql for CmdType {
    fn column_result(value: rusqlite::types::ValueRef) -> rusqlite::types::FromSqlResult<Self> {
        let type_: String = value.as_str()?.to_string();
        match type_.as_str() {
            "iframe" => Ok(CmdType::Iframe),
            "worker" => Ok(CmdType::Worker),
            "quick_link" => Ok(CmdType::QuickLink),
            _ => Err(rusqlite::types::FromSqlError::InvalidType),
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Cmd {
    pub cmd_id: i32,
    pub ext_id: i32,
    pub name: String,
    #[serde(rename = "type")]
    pub type_: CmdType,
    pub data: String,
    pub alias: Option<String>,
    pub hotkey: Option<String>,
    pub enabled: bool,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cmd_type() {
        let iframe = CmdType::Iframe;
        let worker = CmdType::Worker;
        let quick_link = CmdType::QuickLink;
        assert_eq!(iframe.to_string(), "iframe");
        assert_eq!(worker.to_string(), "worker");
        assert_eq!(quick_link.to_string(), "quick_link");
    }
}
