import test from 'node:test';
import assert from 'node:assert/strict';
import { whatsappAttendanceReport } from '../lib/report.js';

test('whatsapp report groups statuses', ()=>{
  const text=whatsappAttendanceReport('2026-03-16',[{id:'1',date:'2026-03-16',playerId:'P1',status:'present'}],[{id:'P1',fullName:'A',coachIds:[],active:true,createdAt:'2026-01-01'}],[{id:'C1',name:'Coach',active:true}],[{id:'B1',name:'Batch',level:'x',schedule:'y',primaryCoachId:'C1'}]);
  assert.ok(text.includes('Present: A'));
});
