/* Solve with Mrs. Yost practice engine. Add question sets here without changing page layout. */
(function(){
const BANK={
 'solving-one-step-equations':true,
 'solving-multi-step-equations':true
};
let current=null, level='easy', count=0, attempts=0;
const $=id=>document.getElementById(id);
function gcd(a,b){while(b){[a,b]=[b,a%b]}return Math.abs(a)}
function fmt(n,d=1){if(d<0){n=-n;d=-d}const g=gcd(Math.abs(n),d);return d/g===1?String(n/g):`${n/g}/${d/g}`}
function build(id,l,n){
 // Fixed, deterministic variation: students can always revisit a problem.
 const x= ((n*7+3)%17)-8 || 4;
 const a=2+(n*3)%8, b=((n*5+7)%19)-9, c=((n*11+2)%13)-6;
 let q, hint, steps, answer=String(x);
 if(id==='solving-one-step-equations'){
  if(l==='easy'){
   if(n%2){q=`x ${b>=0?'+':'−'} ${Math.abs(b)} = ${x+b}`;hint='Use the inverse operation to isolate x.';steps=`Subtract ${b} from both sides. x = ${x}.`}
   else{q=`${a}x = ${a*x}`;hint=`Divide both sides by ${a}.`;steps=`x = ${a*x} ÷ ${a} = ${x}.`}
  }else if(l==='medium'){
   if(n%2){q=`x/${a} = ${fmt(x,a)}`;hint=`Multiply both sides by ${a}.`;steps=`x = (${fmt(x,a)}) × ${a} = ${x}.`}
   else{q=`x ${b>=0?'+':'−'} ${Math.abs(b)} = ${x+b}`;hint='Undo the addition or subtraction.';steps=`x = ${x+b} − (${b}) = ${x}.`}
  }else{
   const d=2+(n%5);q=`${a}x = ${fmt(a*x,d)} × ${d}`;hint='Simplify the right side, then divide by the coefficient of x.';steps=`${a}x = ${a*x}, so x = ${x}.`;
  }
 }else{
  if(l==='easy') {q=`${a}x ${b>=0?'+':'−'} ${Math.abs(b)} = ${a*x+b}`;hint=`Undo ${b>=0?'addition':'subtraction'} first, then divide by ${a}.`;steps=`${a}x = ${a*x+b} − (${b}) = ${a*x}; x = ${x}.`}
  else if(l==='medium'){q=`${a}(x ${c>=0?'+':'−'} ${Math.abs(c)}) = ${a*(x+c)}`;hint=`Divide by ${a}, then isolate x.`;steps=`x + (${c}) = ${x+c}; x = ${x}.`}
  else{const d=a+2;q=`${a}x ${b>=0?'+':'−'} ${Math.abs(b)} = ${d}x ${a*x+b-d*x>=0?'+':'−'} ${Math.abs(a*x+b-d*x)}`;hint='Move variable terms to one side and constants to the other.';steps=`${a}x + (${b}) = ${d}x + (${a*x+b-d*x}); (${a-d})x = ${a*x-d*x}; x = ${x}.`}
 }
 return {q,answer,hint,steps};
}
function parseNum(v){v=v.trim().replace(/−/g,'-');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*\/\s*[+-]?(?:\d+(?:\.\d*)?|\.\d+))?$/.test(v))return NaN;const p=v.split('/').map(Number);return p.length===2&&p[1]!==0?p[0]/p[1]:p[0]}
function show(){current=build(window.practiceSkillId,level,count);attempts=0;$('tryit-problem').textContent=current.q;$('tryit-answer').value='';$('tryit-feedback').textContent='';$('tryit-hint').hidden=true;$('tryit-solution').hidden=true;$('tryit-number').textContent=`Problem ${count+1}`;}
window.mountTryIt=function(id){window.practiceSkillId=id;if(!BANK[id])return false;level='easy';count=0;
const box=$('tryit-mount');if(!box)return false;
box.innerHTML=`<div class="tryit-controls"><label for="tryit-level">Difficulty</label><select id="tryit-level"><option value="easy">Easy</option><option value="medium">Medium</option><option value="challenge">Challenge</option></select><span id="tryit-number"></span></div><div class="tryit-question" id="tryit-problem"></div><label for="tryit-answer">Enter x (fractions like -3/2 work)</label><div class="tryit-input"><input id="tryit-answer" autocomplete="off" inputmode="decimal" placeholder="x = …"><button type="button" id="tryit-check">Check answer</button></div><p id="tryit-feedback" role="status" aria-live="polite"></p><div class="tryit-actions"><button type="button" id="tryit-hint-button">Show hint</button><button type="button" id="tryit-solution-button">Show solution</button><button type="button" id="tryit-next">Next problem →</button></div><p id="tryit-hint" hidden></p><div id="tryit-solution" hidden></div><p class="tryit-footnote">No account or grades. Practice as many times as you like.</p>`;
$('tryit-level').addEventListener('change',e=>{level=e.target.value;count=0;show()});$('tryit-check').addEventListener('click',()=>{attempts++;const val=parseNum($('tryit-answer').value);$('tryit-feedback').textContent=Number.isFinite(val)&&Math.abs(val-Number(current.answer))<1e-9?'✓ Correct! Nice work.':'Not quite. Try again or use a hint.';});$('tryit-answer').addEventListener('keydown',e=>{if(e.key==='Enter'){$('tryit-check').click()}});$('tryit-hint-button').addEventListener('click',()=>{$('tryit-hint').hidden=false;$('tryit-hint').textContent='Hint: '+current.hint});$('tryit-solution-button').addEventListener('click',()=>{$('tryit-solution').hidden=false;$('tryit-solution').textContent='Solution: '+current.steps});$('tryit-next').addEventListener('click',()=>{count++;show()});show();return true;
};
})();