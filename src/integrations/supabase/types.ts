export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      access_log: {
        Row: {
          accessed_at: string | null
          action: string
          details: Json | null
          id: string
          ip_address: unknown | null
          record_id: string | null
          severity: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
          user_type: string | null
        }
        Insert: {
          accessed_at?: string | null
          action: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          severity?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Update: {
          accessed_at?: string | null
          action?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          record_id?: string | null
          severity?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          permissions: Json | null
          role: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id: string
          permissions?: Json | null
          role?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          permissions?: Json | null
          role?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          price: number
          product_name: string
          quantity: number
          session_expires_at: string | null
          session_id: string
          session_token: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          product_name: string
          quantity?: number
          session_expires_at?: string | null
          session_id: string
          session_token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          product_name?: string
          quantity?: number
          session_expires_at?: string | null
          session_id?: string
          session_token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          access_token: string | null
          created_at: string
          customer_email: string
          customer_email_encrypted: string | null
          customer_name: string
          customer_name_encrypted: string | null
          customer_phone: string | null
          customer_phone_encrypted: string | null
          id: string
          items: Json
          order_number: string | null
          order_status: string
          payment_method: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          customer_email: string
          customer_email_encrypted?: string | null
          customer_name: string
          customer_name_encrypted?: string | null
          customer_phone?: string | null
          customer_phone_encrypted?: string | null
          id?: string
          items: Json
          order_number?: string | null
          order_status?: string
          payment_method?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string
          customer_email?: string
          customer_email_encrypted?: string | null
          customer_name?: string
          customer_name_encrypted?: string | null
          customer_phone?: string | null
          customer_phone_encrypted?: string | null
          id?: string
          items?: Json
          order_number?: string | null
          order_status?: string
          payment_method?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          full_name_encrypted: string | null
          id: string
          phone: string | null
          phone_encrypted: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          full_name_encrypted?: string | null
          id: string
          phone?: string | null
          phone_encrypted?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          full_name_encrypted?: string | null
          id?: string
          phone?: string | null
          phone_encrypted?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          attempt_count: number | null
          attempts: number | null
          blocked_until: string | null
          identifier: string
          last_attempt: string | null
        }
        Insert: {
          attempt_count?: number | null
          attempts?: number | null
          blocked_until?: string | null
          identifier: string
          last_attempt?: string | null
        }
        Update: {
          attempt_count?: number | null
          attempts?: number | null
          blocked_until?: string | null
          identifier?: string
          last_attempt?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      admin_order_export: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          customer_type: string | null
          id: string | null
          items: Json | null
          order_number: string | null
          order_status: string | null
          payment_method: string | null
          total_amount: number | null
          user_profile_name: string | null
        }
        Relationships: []
      }
      privacy_compliance_summary: {
        Row: {
          guest_orders: number | null
          recent_orders: number | null
          redacted_orders: number | null
          registered_customers: number | null
          total_orders: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      bootstrap_admin: {
        Args: { admin_email: string }
        Returns: boolean
      }
      bootstrap_admin_secure: {
        Args: { admin_email: string }
        Returns: boolean
      }
      check_admin_permission: {
        Args: { required_permission: string }
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          p_identifier: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_cart_items: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      decrypt_pii: {
        Args: { encrypted_data: string }
        Returns: string
      }
      encrypt_pii: {
        Args: { data: string }
        Returns: string
      }
      generate_session_token: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      log_order_access: {
        Args: { order_id: string; access_type: string }
        Returns: undefined
      }
      log_security_event: {
        Args: {
          event_type: string
          user_id?: string
          details?: Json
          severity?: string
        }
        Returns: undefined
      }
      safe_inet_cast: {
        Args: { ip_string: string }
        Returns: unknown
      }
      set_session_context: {
        Args: { parameter_name: string; parameter_value: string }
        Returns: undefined
      }
      validate_order_token: {
        Args: { order_access_token: string }
        Returns: boolean
      }
      validate_security_config: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_name: string
          status: string
          recommendation: string
        }[]
      }
      validate_session_token: {
        Args: { token: string }
        Returns: boolean
      }
      validate_session_token_secure: {
        Args: { token: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
