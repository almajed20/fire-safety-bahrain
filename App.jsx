import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Search, Plus, FileText, Users, Settings, Building, Upload } from 'lucide-react'
import civilDefenseLogo from './assets/civil_defense_logo.png'
import interiorMinistryLogo from './assets/interior_ministry_logo.png'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [facilities, setFacilities] = useState([])
  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [showNewAccount, setShowNewAccount] = useState(false)
  const [requestCounter, setRequestCounter] = useState(1) // Counter for automatic numbering

  // Generate automatic request number
  const generateRequestNumber = () => {
    const currentYear = new Date().getFullYear().toString().slice(-2) // Get last 2 digits of year
    const paddedCounter = requestCounter.toString().padStart(2, '0')
    return `${currentYear}-${paddedCounter}`
  }

  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  // Facility registration form state
  const [facilityData, setFacilityData] = useState({
    ownerName: '',
    personalId: '',
    registrationNumber: '',
    facilityName: '',
    phoneNumber: '',
    address: '',
    area: '',
    buildingNumber: '',
    complex: '',
    road: '',
    facilityDetails: '',
    floors: '',
    fireExits: '',
    requirements: {
      fireDoorsHalfHour: false,
      fireDoorsOneHour: false,
      fireDoorsTwoHours: false,
      extinguishers: false,
      fireHose: false,
      mechanicalVentilation: false,
      naturalVentilation: false,
      heatInsulation: false
    },
    dwgFiles: []
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setCurrentUser({ name: 'مدير النظام', role: 'admin' })
    } else {
      alert('بيانات الدخول غير صحيحة')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setLoginData({ username: '', password: '' })
  }

  const handleFacilitySubmit = (e) => {
    e.preventDefault()
    const requestNumber = generateRequestNumber()
    const newFacility = {
      id: Date.now(),
      requestNumber: requestNumber,
      ...facilityData,
      registeredAt: new Date().toLocaleString('ar-BH'),
      status: 'مسجل'
    }
    setFacilities([...facilities, newFacility])
    setRequestCounter(requestCounter + 1) // Increment counter for next registration
    setFacilityData({
      ownerName: '',
      personalId: '',
      registrationNumber: '',
      facilityName: '',
      phoneNumber: '',
      address: '',
      area: '',
      buildingNumber: '',
      complex: '',
      road: '',
      facilityDetails: '',
      floors: '',
      fireExits: '',
      requirements: {
        fireDoorsHalfHour: false,
        fireDoorsOneHour: false,
        fireDoorsTwoHours: false,
        extinguishers: false,
        fireHose: false,
        mechanicalVentilation: false,
        naturalVentilation: false,
        heatInsulation: false
      },
      dwgFiles: []
    })
    setShowRegistrationForm(false)
    alert(`تم تسجيل المنشأة بنجاح\nرقم الطلب: ${requestNumber}`)
  }

  const filteredFacilities = facilities.filter(facility =>
    facility.ownerName.includes(searchTerm) ||
    facility.personalId.includes(searchTerm) ||
    facility.registrationNumber.includes(searchTerm) ||
    facility.facilityName.includes(searchTerm) ||
    facility.phoneNumber.includes(searchTerm) ||
    facility.requestNumber.includes(searchTerm)
  )

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img src={interiorMinistryLogo} alt="وزارة الداخلية" className="h-16 w-16" />
              <img src={civilDefenseLogo} alt="الدفاع المدني" className="h-16 w-16" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">
              نظام إدارة الحماية والسلامة من الحريق
            </CardTitle>
            <p className="text-gray-600">تسجيل دخول الموظفين</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
                <Input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  placeholder="أدخل اسم المستخدم"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">كلمة المرور</label>
                <Input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="أدخل كلمة المرور"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                تسجيل الدخول
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img src={interiorMinistryLogo} alt="وزارة الداخلية" className="h-10 w-10" />
              <img src={civilDefenseLogo} alt="الدفاع المدني" className="h-10 w-10" />
              <h1 className="text-xl font-bold text-blue-900">نظام إدارة الحماية والسلامة</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">مرحباً، {currentUser.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="facilities">تسجيل المنشآت</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المنشآت</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{facilities.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">التقارير المعلقة</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reports.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المفتشين النشطين</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">تسجيل المنشآت</h2>
              <Button onClick={() => setShowRegistrationForm(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                تسجيل منشأة جديدة
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث برقم الطلب، رقم السجل، الرقم الشخصي، اسم المالك، رقم الهاتف، أو اسم المنشأة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Facilities List */}
            <div className="grid gap-4">
              {filteredFacilities.map((facility) => (
                <Card key={facility.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            رقم الطلب: {facility.requestNumber}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{facility.facilityName}</h3>
                        <p className="text-gray-600">المالك: {facility.ownerName}</p>
                        <p className="text-gray-600">الهاتف: {facility.phoneNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">رقم السجل: {facility.registrationNumber}</p>
                        <p className="text-sm text-gray-600">الرقم الشخصي: {facility.personalId}</p>
                        <p className="text-sm text-gray-600">العنوان: {facility.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">المنطقة: {facility.area}</p>
                        <p className="text-sm text-gray-600">المبنى: {facility.buildingNumber}</p>
                        <p className="text-sm text-gray-600">الطوابق: {facility.floors || 'غير محدد'}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{facility.status}</Badge>
                        <span className="text-sm text-gray-500">{facility.registeredAt}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Registration Form Modal */}
            {showRegistrationForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <CardTitle>تسجيل منشأة جديدة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFacilitySubmit} className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">اسم المالك *</label>
                          <Input
                            value={facilityData.ownerName}
                            onChange={(e) => setFacilityData({...facilityData, ownerName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">الرقم الشخصي *</label>
                          <Input
                            value={facilityData.personalId}
                            onChange={(e) => setFacilityData({...facilityData, personalId: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">رقم السجل *</label>
                          <Input
                            value={facilityData.registrationNumber}
                            onChange={(e) => setFacilityData({...facilityData, registrationNumber: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">اسم المنشأة *</label>
                          <Input
                            value={facilityData.facilityName}
                            onChange={(e) => setFacilityData({...facilityData, facilityName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                          <Input
                            value={facilityData.phoneNumber}
                            onChange={(e) => setFacilityData({...facilityData, phoneNumber: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">العنوان *</label>
                          <Input
                            value={facilityData.address}
                            onChange={(e) => setFacilityData({...facilityData, address: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">المنطقة *</label>
                          <Input
                            value={facilityData.area}
                            onChange={(e) => setFacilityData({...facilityData, area: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">رقم المبنى *</label>
                          <Input
                            value={facilityData.buildingNumber}
                            onChange={(e) => setFacilityData({...facilityData, buildingNumber: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">المجمع</label>
                          <Input
                            value={facilityData.complex}
                            onChange={(e) => setFacilityData({...facilityData, complex: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">الطريق</label>
                          <Input
                            value={facilityData.road}
                            onChange={(e) => setFacilityData({...facilityData, road: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">عدد الطوابق</label>
                          <Input
                            value={facilityData.floors}
                            onChange={(e) => setFacilityData({...facilityData, floors: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">عدد مخارج الحريق</label>
                          <Input
                            value={facilityData.fireExits}
                            onChange={(e) => setFacilityData({...facilityData, fireExits: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Facility Details */}
                      <div>
                        <label className="block text-sm font-medium mb-2">تفاصيل المنشأة</label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-md"
                          rows="4"
                          value={facilityData.facilityDetails}
                          onChange={(e) => setFacilityData({...facilityData, facilityDetails: e.target.value})}
                          placeholder="أدخل تفاصيل إضافية عن المنشأة..."
                        />
                      </div>

                      {/* Requirements Checklist */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">المتطلبات المطلوبة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { key: 'fireDoorsHalfHour', label: 'أبواب مقاومة للحريق مدة نصف ساعة' },
                            { key: 'fireDoorsOneHour', label: 'أبواب مقاومة للحريق مدة ساعة' },
                            { key: 'fireDoorsTwoHours', label: 'أبواب مقاومة للحريق مدة ساعتين' },
                            { key: 'extinguishers', label: 'طفايات' },
                            { key: 'fireHose', label: 'خرطوم الحريق' },
                            { key: 'mechanicalVentilation', label: 'تهوية ميكانيكية' },
                            { key: 'naturalVentilation', label: 'تهوية طبيعية' },
                            { key: 'heatInsulation', label: 'مواد عازلة للحرارة' }
                          ].map((req) => (
                            <div key={req.key} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={req.key}
                                checked={facilityData.requirements[req.key]}
                                onChange={(e) => setFacilityData({
                                  ...facilityData,
                                  requirements: {
                                    ...facilityData.requirements,
                                    [req.key]: e.target.checked
                                  }
                                })}
                                className="ml-2"
                              />
                              <label htmlFor={req.key} className="text-sm">{req.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* DWG File Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-2">ملفات DWG</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">اسحب وأفلت ملفات DWG هنا أو انقر للتحديد</p>
                          <input
                            type="file"
                            multiple
                            accept=".dwg"
                            className="hidden"
                            onChange={(e) => setFacilityData({...facilityData, dwgFiles: Array.from(e.target.files)})}
                          />
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex justify-end gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowRegistrationForm(false)}
                        >
                          إلغاء
                        </Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          حفظ المنشأة
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold">التقارير</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">لا توجد تقارير حالياً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">الإعدادات</h2>
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">تغيير كلمة المرور</h3>
                      <p className="text-gray-600">تحديث كلمة المرور الخاصة بك</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowPasswordChange(true)}
                    >
                      تغيير
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">إنشاء حساب جديد</h3>
                      <p className="text-gray-600">إضافة مستخدم جديد للنظام</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewAccount(true)}
                    >
                      إنشاء حساب
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App

