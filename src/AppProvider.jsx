import React from 'react'
import { ConfigProvider } from 'antd'
import 'moment/locale/vi'
import locale1 from 'antd/es/date-picker/locale/vi_VN'

export default function AppProvider({ children }) {
  return (
    // <ConfigProvider locale={currentAppLocale.antd}>
    <ConfigProvider locale={locale1}>
        {children}
    </ConfigProvider>
  )
}
