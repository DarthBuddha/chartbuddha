fn get_windows_accent_color() -> String {
  let hkcu = match
    RegKey::predef(HKEY_CURRENT_USER).open_subkey("SOFTWARE\\Microsoft\\Windows\\DWM")
  {
    Ok(key) => key,
    Err(_) => {
      return FALLBACK_COLOR.to_string();
    }
  };

  let color = match hkcu.get_value::<u32, _>("AccentColor") {
    Ok(value) => value,
    Err(_) => {
      return FALLBACK_COLOR.to_string();
    }
  };

  let r = (color & 0xff) as u8;
  let g = ((color >> 8) & 0xff) as u8;
  let b = ((color >> 16) & 0xff) as u8;

  format!("{}, {}, {}", r, g, b)
}
