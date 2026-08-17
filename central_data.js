/* طبقة بيانات مركزية للمشروع الأصلي fire-safety-bahrain.
   يبقى التخزين المحلي كنسخة احتياطية أثناء الانتقال، وتكون Supabase هي المصدر المشترك بين الصفحات والأجهزة. */
(function () {
  const API_URL = 'https://hwcgpgntijzuglwexkcc.supabase.co/rest/v1';
  const PUBLISHABLE_KEY = 'sb_publishable_cX8IUYc1IrIHLakGM6BFww_PxByokwA';
  const headers = { apikey: PUBLISHABLE_KEY, Authorization: `Bearer ${PUBLISHABLE_KEY}`, 'Content-Type': 'application/json' };

  async function request(path, options = {}) {
    const response = await fetch(`${API_URL}/${path}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
    if (!response.ok) throw new Error(`Central data request failed: ${response.status}`);
    return response.status === 204 ? null : response.json();
  }

  function mapFacility(row, requirements) {
    return {
      centralId: row.id,
      requestNumber: row.facility_number,
      ownerName: row.owner_name || '', personalId: row.personal_id || '', registrationNumber: row.registration_number || '',
      facilityName: row.facility_name, phoneNumber: row.phone_number || '', area: row.area || '', buildingNumber: row.building_number || '',
      complex: row.complex || '', road: row.road || '', floors: row.floors || '', fireExits: row.fire_exits || '',
      hazardousMaterials: row.hazardous_materials ? 'yes' : 'no', facilityDetails: row.details || '',
      requirements: requirements.filter(item => item.facility_id === row.id && item.is_required).map(item => item.requirement_key),
      registrationDate: row.created_at ? new Date(row.created_at).toLocaleDateString('ar-SA') : '', status: row.status || 'مسجل'
    };
  }

  async function pullFacilities() {
    const [rows, requirements] = await Promise.all([
      request('facilities?select=*&order=created_at.desc'),
      request('facility_requirements?select=*')
    ]);
    const facilities = rows.map(row => mapFacility(row, requirements));
    localStorage.setItem('facilities', JSON.stringify(facilities));
    return facilities;
  }

  async function saveFacility(facility) {
    const payload = {
      facility_number: facility.requestNumber,
      facility_name: facility.facilityName,
      owner_name: facility.ownerName || null,
      personal_id: facility.personalId || null,
      registration_number: facility.registrationNumber || null,
      phone_number: facility.phoneNumber || null,
      area: facility.area || null,
      building_number: facility.buildingNumber || null,
      complex: facility.complex || null,
      road: facility.road || null,
      floors: facility.floors ? Number(facility.floors) : null,
      fire_exits: facility.fireExits ? Number(facility.fireExits) : null,
      hazardous_materials: facility.hazardousMaterials === 'yes' || facility.hazardousMaterials === true,
      details: facility.facilityDetails || null,
      status: facility.status || 'مسجل'
    };
    const rows = await request('facilities', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(payload) });
    const saved = rows[0];
    const requirements = (facility.requirements || []).map(key => ({ facility_id: saved.id, requirement_key: key, requirement_label: key, requirement_section: 'متطلبات الحماية والسلامة', is_required: true }));
    if (requirements.length) await request('facility_requirements', { method: 'POST', body: JSON.stringify(requirements) });
    return saved;
  }

  window.FireSafetyCentral = { pullFacilities, saveFacility, request };
  window.addEventListener('load', () => pullFacilities().catch(error => console.warn('Using local data while central sync is unavailable.', error)));
})();
