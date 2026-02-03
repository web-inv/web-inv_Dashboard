import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Profile info
  const [user, setUser] = useState({
    username: "Abarna",
    email: "abarna@company.com",
    company: "TechCorp Inc.",
    role: "Product Manager",
  });

  // Password info
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: false,
    marketing: false,
  });

  // Save handler
  const handleSave = () => {
    // Password validation
    if (passwords.new && passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Here you would call your API to save profile, notifications, and password
    console.log("User Info:", user);
    console.log("Passwords:", passwords);
    console.log("Notifications:", notifications);

    alert("Settings saved successfully!");
  };

  return (
    <DashboardLayout
      title="Account Settings"
      subtitle="Manage your account preferences and configuration"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="glass-panel p-4 h-fit">
          <nav className="space-y-1">
            {[
              { icon: User, label: "Profile", active: true },
            ].map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? "bg-primary/20 border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </h3>

            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center text-2xl font-bold uppercase">
                {user.username.charAt(0)}
              </div>
              <div>
                <Button variant="glass" size="sm">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max 2MB
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />
              <Input
                label="Email"
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
              />
              <Input
                label="Company"
                value={user.company}
                onChange={(e) =>
                  setUser({ ...user, company: e.target.value })
                }
              />
              <Input
                label="Role"
                value={user.role}
                onChange={(e) =>
                  setUser({ ...user, role: e.target.value })
                }
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-primary" />
              Security
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Current Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </h3>

            <div className="space-y-4">
              {[
                { key: "email", title: "Email Notifications" },
                { key: "push", title: "Push Notifications" },
                { key: "weekly", title: "Weekly Reports" },
                { key: "marketing", title: "Marketing Updates" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/10"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]:
                          !prev[item.key as keyof typeof prev],
                      }))
                    }
                    className={`w-12 h-6 rounded-full ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button size="lg" className="gap-2" onClick={handleSave}>
              <Save className="w-5 h-5" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

/* Reusable Input Component */
const Input = ({ label, type = "text", value, onChange }: any) => (
  <div>
    <label className="text-sm text-muted-foreground mb-2 block">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border focus:ring-2 focus:ring-primary/50"
    />
  </div>
);

export default Settings;
