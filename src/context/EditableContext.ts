import type { FormInstance } from 'antd/es/form';
import { createContext } from 'react';

export const  EditableContext = createContext<FormInstance | null>(null);