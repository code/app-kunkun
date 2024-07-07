use db::{
    models::{Ext, ExtData},
    JarvisDB,
};
use std::{path::PathBuf, sync::Mutex};
use tauri::State;

#[derive(Debug)]
pub struct DBState {
    pub db: Mutex<JarvisDB>,
    // pub peers: Mutex<HashMap<String, ServiceInfoMod>>,
}

impl DBState {
    pub fn new(path: PathBuf, key: Option<String>) -> anyhow::Result<Self> {
        let db = JarvisDB::new(path, key)?;
        db.init()?;
        Ok(Self { db: Mutex::new(db) })
    }
}

#[tauri::command]
pub async fn create_extension(
    db: State<'_, DBState>,
    identifier: &str,
    version: &str,
    alias: Option<&str>,
    hotkey: Option<&str>,
) -> Result<(), String> {
    db.db
        .lock()
        .unwrap()
        .create_extension(identifier, version, alias, hotkey)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn get_all_extensions(db: State<'_, DBState>) -> Result<Vec<Ext>, String> {
    db.db
        .lock()
        .unwrap()
        .get_all_extensions()
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn get_extension_by_identifier(
    identifier: &str,
    db: State<'_, DBState>,
) -> Result<Option<Ext>, String> {
    db.db
        .lock()
        .unwrap()
        .get_extension_by_identifier(identifier)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn delete_extension_by_identifier(
    identifier: &str,
    db: State<'_, DBState>,
) -> Result<(), String> {
    db.db
        .lock()
        .unwrap()
        .delete_extension_by_identifier(identifier)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn create_extension_data(
    ext_id: i32,
    data_type: &str,
    data: &str,
    search_text: Option<&str>,
    db: State<'_, DBState>,
) -> Result<(), String> {
    db.db
        .lock()
        .unwrap()
        .create_extension_data(ext_id, data_type, data, search_text)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn get_extension_data_by_id(
    data_id: i32,
    db: State<'_, DBState>,
) -> Result<Option<ExtData>, String> {
    db.db
        .lock()
        .unwrap()
        .get_extension_data_by_id(data_id)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn search_extension_data(
    ext_id: i32,
    data_type: Option<&str>,
    search_text: Option<&str>,
    after_created_at: Option<&str>,
    before_created_at: Option<&str>,
    db: State<'_, DBState>,
) -> Result<Vec<ExtData>, String> {
    db.db
        .lock()
        .unwrap()
        .search_extension_data(
            ext_id,
            data_type,
            search_text,
            after_created_at,
            before_created_at,
        )
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn delete_extension_data_by_id(
    data_id: i32,
    db: State<'_, DBState>,
) -> Result<(), String> {
    db.db
        .lock()
        .unwrap()
        .delete_extension_data_by_id(data_id)
        .map_err(|err| err.to_string())
}

#[tauri::command]
pub async fn update_extension_data_by_id(
    data_id: i32,
    data: &str,
    search_text: Option<&str>,
    db: State<'_, DBState>,
) -> Result<(), String> {
    db.db
        .lock()
        .unwrap()
        .update_extension_data_by_id(data_id, data, search_text)
        .map_err(|err| err.to_string())
}