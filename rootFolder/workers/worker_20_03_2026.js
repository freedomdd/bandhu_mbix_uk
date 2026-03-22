const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Bandhu Foundation Mobile</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <style>
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { font-family: -apple-system, system-ui, sans-serif; margin: 0; background:#f0f2f5; padding: 10px; padding-bottom: 50px; }
        .container { max-width: 500px; margin: 0 auto; background: white; padding: 15px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        
        header { text-align: center; border-bottom: 2px solid #1a3c6d; padding-bottom: 10px; margin-bottom: 20px; }
        header h1 { color: #1a3c6d; font-size: 1.3rem; margin: 0; }
        .form-header-box { background: #1a3c6d; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; font-size: 0.7rem; margin-top: 5px; font-weight: bold; }

        .section-label { background: #e7f3ff; color: #1a3c6d; padding: 5px 10px; font-size: 0.8rem; font-weight: bold; border-radius: 4px; margin: 20px 0 10px 0; }
        label { display: block; font-weight: 600; margin: 10px 0 4px; font-size: 0.85rem; color: #444; }
        input, select, textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 16px; background: #fafafa; margin-bottom: 5px; }
        
        .upload-section { background: #f8f9fa; border: 2px dashed #cbd5e0; border-radius: 12px; padding: 15px; text-align: center; margin-bottom: 15px; }
        .preview-img { width: 90px; height: 90px; object-fit: cover; border-radius: 10px; display: none; margin: 0 auto 10px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .sig-preview { width: 160px; height: 60px; object-fit: contain; }

        .radio-card { background: #f9f9f9; padding: 10px; border-radius: 8px; border: 1px solid #eee; margin: 10px 0; }
        .radio-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; font-size: 0.9rem; }
        .radio-group { display: flex; gap: 10px; font-weight: bold; }

        .btn-group { display: flex; flex-direction: column; gap: 8px; margin-top: 15px; }
        button { padding: 14px; border: none; border-radius: 10px; font-weight: bold; font-size: 1rem; cursor: pointer; color: white; }
        .btn-save { background: #198754; }
        .btn-update { background: #0d6efd; display: none; }
        .btn-cancel { background: #6c757d; display: none; }
        .btn-refresh { background: #6f42c1; width: 100%; margin: 15px 0; font-size: 0.85rem; padding: 10px; }

        .member-card { background: white; border: 1px solid #eee; border-radius: 10px; padding: 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .member-card img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background: #eee; }
        .member-info { flex: 1; min-width: 0; }
        .member-name { font-weight: bold; font-size: 0.95rem; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .member-sub { font-size: 0.75rem; color: #666; }
        .actions { display: flex; gap: 5px; }
        .btn-sm { padding: 8px; border-radius: 6px; font-size: 0.7rem; color:white; border:none; }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>BANDHU FOUNDATION</h1>
        <div class="form-header-box" id="formTitle">MEMBERSHIP APPLICATION</div>
    </header>

    <form id="userForm">
        <input type="hidden" id="editId" name="editId">
        
        <div class="upload-section">
            <img id="p-prev" class="preview-img">
            <label>📸 Applicant Photograph *</label>
            <input type="file" id="imgInput" name="profile_img" accept="image/*" onchange="preview(this, 'p-prev')">
        </div>

        <div class="section-label">PERSONAL DETAILS</div>
        <label>1. Full Name *</label>
        <input type="text" id="fn" name="full_name" placeholder="As per Aadhaar" required>

        <label>2. Full Address *</label>
        <textarea id="addr" name="address" rows="2" placeholder="Street, Vill, PIN" required></textarea>

        <div style="display:flex; gap:10px;">
            <div style="flex:1;"><label>3. State</label><input type="text" id="state" name="state" value="West Bengal"></div>
            <div style="flex:1;"><label>4. Nationality</label><input type="text" id="nat" name="nationality" value="Indian"></div>
        </div>

        <div style="display:flex; gap:10px;">
            <div style="flex:1;"><label>5. Gender</label><select id="gen" name="gender"><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div style="flex:1;"><label>6. Blood Group</label><input type="text" id="bg" name="blood_group" placeholder="O+"></div>
        </div>

        <label>7. Date of Birth</label>
        <input type="date" id="dob" name="dob" required>

        <label>8. Qualification / Profession</label>
        <input type="text" id="edu" name="qualification" placeholder="Degree & Job">

        <div class="section-label">CONTACT INFO</div>
        <label>9. Mobile Number *</label>
        <input type="tel" id="mob" name="mobile" pattern="[0-9]{10}" placeholder="10-digit mobile" required>

        <label>10. WhatsApp / Emergency</label>
        <div style="display:flex; gap:10px;">
            <input type="tel" id="wa" name="whatsapp" placeholder="WhatsApp">
            <input type="tel" id="emg" name="emergency" placeholder="Emergency">
        </div>

        <div class="radio-card">
            <div class="radio-row">
                <span>Blood Donation?</span>
                <div class="radio-group">
                    <label><input type="radio" name="blood_don" value="Yes" checked> Yes</label>
                    <label><input type="radio" name="blood_don" value="No"> No</label>
                </div>
            </div>
            <div class="radio-row">
                <span>Remote Work?</span>
                <div class="radio-group">
                    <label><input type="radio" name="remote" value="Yes" checked> Yes</label>
                    <label><input type="radio" name="remote" value="No"> No</label>
                </div>
            </div>
        </div>

        <div class="upload-section">
            <img id="s-prev" class="preview-img sig-preview">
            <label>✍️ Digital Signature *</label>
            <input type="file" id="sigInput" name="signature_img" accept="image/*" onchange="preview(this, 's-prev')">
        </div>

        <div style="display:flex; gap:10px;">
            <div style="flex:1;"><label>Place</label><input type="text" id="place" name="place" placeholder="City" required></div>
            <div style="flex:1;"><label>Date</label><input type="date" id="reg_date" name="reg_date"></div>
        </div>

        <div class="btn-group">
            <button type="submit" id="saveBtn" class="btn-save">Submit Application</button>
            <button type="button" id="updateBtn" class="btn-update">Update Member</button>
            <button type="button" id="cancelBtn" class="btn-cancel">Cancel Edit</button>
        </div>
    </form>

    <button class="btn-refresh" onclick="syncWithServer()">🔄 Refresh Data from Server</button>
    
    <h3 style="color:#1a3c6d; border-bottom:1px solid #ddd; padding-bottom:5px; margin-bottom:10px; font-size:1rem;">Registered Members (Offline Cache)</h3>
    <div id="memberList"></div>
</div>

<script>
const API = window.location.origin;

// 1. Image Preview logic
function preview(input, id) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => { $('#' + id).attr('src', e.target.result).show(); };
        reader.readAsDataURL(input.files[0]);
    }
}

// 2. Local Storage Logic
function getLocalData() {
    const data = localStorage.getItem('bandhu_members');
    return data ? JSON.parse(data) : [];
}

function saveLocalData(data) {
    localStorage.setItem('bandhu_members', JSON.stringify(data));
}

// 3. Render Table from Local Storage
function renderList() {
    const data = getLocalData();
    let h = '';
    data.forEach(u => {
        const img = \`\${API}/api/img/\${encodeURIComponent(u.user_id)}.webp?v=\${u.time || 0}\`;
        h += \`
        <div class="member-card">
            <img src="\${img}" onerror="this.src='https://via.placeholder.com/55'">
            <div class="member-info">
                <span class="member-name">\${u.json.full_name}</span>
                <span class="member-sub">\${u.json.mobile} | \${u.json.blood_group || ''}</span>
            </div>
            <div class="actions">
                <button class="btn-sm" style="background:#fd7e14;" onclick='editMember(\${JSON.stringify(u)})'>Edit</button>
                <button class="btn-sm" style="background:#dc3545;" onclick="deleteMember(\${u.id})">Del</button>
            </div>
        </div>\`;
    });
    $('#memberList').html(h || '<p style="text-align:center; font-size:0.8rem; color:#999;">No members found. Refresh to sync.</p>');
}

// 4. Sync / Refresh from Server
function syncWithServer() {
    const $btn = $('.btn-refresh');
    $btn.text('Syncing...').prop('disabled', true);
    $.get(\`\${API}/api/list\`, data => {
        saveLocalData(data);
        renderList();
        alert('Data synced with server successfully!');
    }).always(() => $btn.text('🔄 Refresh Data from Server').prop('disabled', false));
}

async function compress(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const size = 350;
                const scale = size / img.width;
                canvas.width = size;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = "white"; ctx.fillRect(0,0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(b => resolve(b), 'image/webp', 0.8);
            };
        };
        reader.readAsDataURL(file);
    });
}

function editMember(u) {
    const d = typeof u.json === 'string' ? JSON.parse(u.json) : u.json;
    $('#editId').val(u.id);
    $('#fn').val(d.full_name);
    $('#mob').val(d.mobile);
    $('#addr').val(d.address);
    $('#state').val(d.state);
    $('#nat').val(d.nationality);
    $('#gen').val(d.gender);
    $('#bg').val(d.blood_group);
    $('#dob').val(d.dob);
    $('#edu').val(d.qualification);
    $('#wa').val(d.whatsapp);
    $('#emg').val(d.emergency);
    $('#place').val(d.place);
    $('#reg_date').val(d.reg_date);
    
    $(\`input[name="blood_don"][value="\${d.blood_don}"]\`).prop('checked', true);
    $(\`input[name="remote"][value="\${d.remote}"]\`).prop('checked', true);

    $('#p-prev').attr('src', \`\${API}/api/img/\${encodeURIComponent(u.user_id)}.webp?v=\${u.time}\`).show();
    $('#s-prev').attr('src', \`\${API}/api/img/\${encodeURIComponent(u.user_id)}_sig.webp?v=\${u.time}\`).show();

    $('#formTitle').text('EDIT MEMBER');
    $('#saveBtn').hide(); $('#updateBtn, #cancelBtn').show();
    window.scrollTo({top:0, behavior:'smooth'});
}

async function handleSave(isUpdate) {
    const fd = new FormData($('#userForm')[0]);
    const $b = isUpdate ? $('#updateBtn') : $('#saveBtn');
    $b.prop('disabled', true).text('Saving...');

    const meta = {};
    fd.forEach((v, k) => { if(!(v instanceof File)) meta[k] = v; });
    fd.append('json_payload', JSON.stringify(meta));

    const p = $('#imgInput')[0].files[0];
    if (p) fd.set('profile_img', await compress(p), 'p.webp');
    const s = $('#sigInput')[0].files[0];
    if (s) fd.set('signature_img', await compress(s), 's.webp');

    $.ajax({
        url: isUpdate ? \`\${API}/api/update\` : \`\${API}/api/add\`,
        type: 'POST', data: fd, processData: false, contentType: false,
        success: () => {
            alert('Success! Syncing now...');
            syncWithServer(); // Automatically refresh after save
            $('#userForm')[0].reset();
            location.reload();
        }
    });
}

function deleteMember(id) {
    if(confirm('Delete permanently from server?')) {
        $.ajax({url:\`\${API}/api/delete/\${id}\`, type:'DELETE', success: syncWithServer});
    }
}

$('#userForm').on('submit', e => { e.preventDefault(); handleSave(false); });
$('#updateBtn').on('click', () => handleSave(true));
$('#cancelBtn').click(() => location.reload());

$(document).ready(() => {
    $('#reg_date').val(new Date().toISOString().split('T')[0]);
    renderList(); // Load offline data first
});
</script>
</body>
</html>
`;

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const cache = caches.default;
        const corsHeaders = { 
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS", 
            "Access-Control-Allow-Headers": "Content-Type" 
        };

        if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

        try {
            if (url.pathname === "/") {
                return new Response(HTML_CONTENT, { headers: { "Content-Type": "text/html" } });
            }

            // IMAGE HANDLING (YOUR PROVEN LOGIC)
            if (url.pathname.startsWith("/api/img/") && url.pathname.endsWith(".webp")) {
                let cachedImage = await cache.match(request);
                if (cachedImage) return cachedImage;

                const filename = url.pathname.split("/api/img/")[1]?.split("?")[0];
                const isSig = filename.includes("_sig");
                const user_id = decodeURIComponent(filename.replace("_sig", "").slice(0, -5));
                
                const targetCol = isSig ? "blob_sign" : "blob";
                // Standard concatenation to avoid D1 token error
                const row = await env.DB.prepare("SELECT " + targetCol + " as data FROM users WHERE user_id = ?")
                    .bind(user_id)
                    .first();

                if (!row || !row.data) return new Response(null, { status: 404, headers: corsHeaders });

                const bytes = new Uint8Array(row.data);
                const response = new Response(bytes, {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "image/webp",
                        "Content-Length": bytes.length.toString(),
                        "Cache-Control": "public, max-age=604800, immutable"
                    }
                });

                await cache.put(request, response.clone());
                return response;
            }

            if (url.pathname === "/api/list") {
                const { results } = await env.DB.prepare("SELECT id, user_id, json, time FROM users ORDER BY id DESC").all();
                const formatted = (results || []).map(r => ({ ...r, json: JSON.parse(r.json) }));
                return new Response(JSON.stringify(formatted), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
            }

            if (url.pathname === "/api/add" || url.pathname === "/api/update") {
                const formData = await request.formData();
                const jsonStr = formData.get("json_payload");
                const data = JSON.parse(jsonStr);
                const editId = formData.get("editId");
                const user_id = data.full_name.toLowerCase().replace(/\s+/g, "_") + "_" + data.mobile;
                const pImg = formData.get("profile_img");
                const sImg = formData.get("signature_img");
                const now = Date.now();

                if (url.pathname === "/api/add") {
                    const pb = pImg ? new Uint8Array(await pImg.arrayBuffer()) : null;
                    const sb = sImg ? new Uint8Array(await sImg.arrayBuffer()) : null;
                    await env.DB.prepare("INSERT INTO users (user_id, json, blob, blob_sign, time) VALUES (?, ?, ?, ?, ?)")
                        .bind(user_id, jsonStr, pb, sb, now).run();
                } else {
                    await env.DB.prepare("UPDATE users SET user_id=?, json=?, time=? WHERE id=?")
                        .bind(user_id, jsonStr, now, Number(editId)).run();
                    if (pImg && pImg.size > 0) {
                        const b = new Uint8Array(await pImg.arrayBuffer());
                        await env.DB.prepare("UPDATE users SET blob=? WHERE id=?").bind(b, Number(editId)).run();
                    }
                    if (sImg && sImg.size > 0) {
                        const b = new Uint8Array(await sImg.arrayBuffer());
                        await env.DB.prepare("UPDATE users SET blob_sign=? WHERE id=?").bind(b, Number(editId)).run();
                    }
                }
                return new Response("OK", { headers: corsHeaders });
            }

            if (url.pathname.startsWith("/api/delete/")) {
                await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(url.pathname.split("/").pop()).run();
                return new Response("OK", { headers: corsHeaders });
            }

            return new Response("Not found", { status: 404 });
        } catch (e) {
            return new Response(e.message, { status: 500, headers: corsHeaders });
        }
    }
};