import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../../../shared/models/member';
import { MemberService } from '../../../../services/member.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  memberService = inject(MemberService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    const memberId = this.route.snapshot.paramMap.get('id');
    if (memberId) {
      this.memberService.getById(memberId).subscribe({
        next: (data) => (this.member = data),
        error: (err) => console.error('Erro ao carregar detalhes do membro', err)
      })
    }
  }
}
