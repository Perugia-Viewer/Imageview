// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{ Menu, MenuItem, Submenu, CustomMenuItem };
// use tauri::Wry;
// use std::path::PathBuf;

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

#[tauri::command]
fn console_print(message: String) {
	println!("[frontend] {message}");
}

/*
  If we need to do cross platform some menu items will need to become condition.
  Examples include: Zoom, Separator, as these won't exist in W.I.N.D.O.Z.E.

	See example: https://doc.rust-lang.org/rust-by-example/attribute/cfg.html
*/
fn main() {
	/* Commented out as not all imports are complete for now, and is unused. */
	// let stores = app.state::<StoreCollection<Wry>>();
	// let path = PathBuf::from("app_data.bin");

	// with_store(app_handle, stores, path, |store| store.insert("a".to_string(), json!("b")))

	let file_menu = Submenu::new("File", Menu::new()
		.add_item(CustomMenuItem::new("open_settings".to_string(), "Settings").accelerator("CommandOrControl+."))
		.add_native_item(MenuItem::Separator)
		.add_native_item(MenuItem::Quit)
	);

	let view_menu = Submenu::new("View", Menu::new()
		.add_item(CustomMenuItem::new("toggle_fullscreen".to_string(), "Fullscreen").accelerator("CommandOrControl+F"))
	);

	let window_menu_inner = Menu::new()
		.add_native_item(MenuItem::Minimize)
		.add_native_item(MenuItem::Zoom);

	let window_menu = Submenu::new("Window", window_menu_inner);

	let menu = Menu::new()
		.add_submenu(file_menu)
		.add_submenu(view_menu)
		.add_submenu(window_menu);

  tauri::Builder::default()
		.menu(menu)
		.on_menu_event(|event| {
			match event.menu_item_id() {
				"open_settings" => {
					event.window().emit("menu_event", Payload { message: "settings".to_string() }).unwrap();
				},
				"toggle_fullscreen" => {
					event.window().emit("menu_event", Payload { message: "fullscreen".to_string() }).unwrap();
				}
				_ => {}
			}
		})
		.invoke_handler(tauri::generate_handler!(console_print))
		.plugin(tauri_plugin_store::Builder::default().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
